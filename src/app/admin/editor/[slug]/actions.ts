"use server";

import { db } from "@/db";
import { image, post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { BlobAccessError, del, put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Post } from "./types";

type PostData = Post & {
  slug: string;
  content: string;
};

export async function updatePost(postData: PostData) {
  try {
    await db.update(post).set(postData).where(eq(post.slug, postData.slug));
  } catch {
    return { error: "Unexpected error occured while updating post" };
  }

  revalidatePath(`/admin/editor/${postData.slug}`);
}

export async function deletePost(slug: string) {
  try {
    await db.delete(post).where(eq(post.slug, slug));
  } catch {
    return { error: "Unexpected error occured while deleting post" };
  }

  revalidatePath(`/admin/editor/${slug}`);
}

export async function uploadImage(
  imageFile: File | undefined,
  altText: string,
) {
  if (!imageFile) return { error: "No image file provided" };

  let blob;
  try {
    blob = await put(imageFile.name, imageFile, {
      access: "public",
      addRandomSuffix: true,
    });
  } catch (error) {
    if (error instanceof BlobAccessError) return { error: error.message };
    else return { error: "Unexpected error occured while uploading image" };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  if (!userId) return { error: "User not found" };

  await db.insert(image).values({
    url: blob.url,
    ownerId: userId,
    alt: altText,
  });

  revalidatePath("/admin/editor/[slug]", "page");
}

export async function deleteImage(url: string) {
  try {
    await del(url);
  } catch (error) {
    if (error instanceof BlobAccessError) return { error: error.message };
    else return { error: "Unexpected error occured while deleting image" };
  }

  try {
    await db.delete(image).where(eq(image.url, url));
  } catch {
    return { error: "Unexpected error occured while deleting image" };
  }

  revalidatePath("/admin/editor/[slug]", "page");
}
