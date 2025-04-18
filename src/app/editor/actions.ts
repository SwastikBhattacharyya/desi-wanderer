"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function createPost() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) return { error: "User not found" };

  const slug = crypto.randomUUID();

  try {
    await db.insert(post).values({
      slug,
      title: "New Post",
      description: "New Post Description",
      authorId: userId,
    });
  } catch {
    return { error: "Failed to create post" };
  }

  revalidatePath("/blog/" + slug);
  revalidatePath("/editor/" + slug);
  revalidateTag("posts");

  return { slug };
}

export async function deletePost(slug: string) {
  try {
    await db.delete(post).where(eq(post.slug, slug));
  } catch {
    return { error: "Failed to delete post" };
  }

  revalidatePath("/blog/" + slug);
  revalidatePath("/editor/" + slug);
  revalidateTag("posts");
}
