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
  id: string;
  title: string;
  description: string;
  oldSlug: string;
  newSlug: string;
  content: string;
  published: boolean;
  masterImage: string | null;
};

export async function updatePost(postData: PostData) {
  try {
    await db
      .update(post)
      .set({
        title: postData.title,
        description: postData.description,
        slug: postData.newSlug,
        content: postData.content,
        published: postData.published,
        masterImage: postData.masterImage,
      })
      .where(eq(post.id, postData.id));
  } catch {
    return { error: "Unexpected error occured while updating post" };
  }

  if (postData.oldSlug !== postData.newSlug)
    revalidatePath(`/editor/${postData.oldSlug}`);
  revalidatePath(`/editor/${postData.newSlug}`);
}

export async function deletePost(slug: string) {
  try {
    await db.delete(post).where(eq(post.slug, slug));
  } catch {
    return { error: "Unexpected error occured while deleting post" };
  }

  revalidatePath(`/editor/${slug}`);
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

  revalidatePath("/editor/[slug]", "page");
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

  revalidatePath("/editor/[slug]", "page");
}
