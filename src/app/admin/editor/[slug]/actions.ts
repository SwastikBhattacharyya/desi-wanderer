"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { APIError } from "better-auth/api";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Post } from "./types";

type PostData = Post & {
  slug: string;
  content: string;
};

export async function updatePost(postData: PostData) {
  try {
    await db.update(post).set(postData).where(eq(post.slug, postData.slug));
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    else return { error: "Unexpected error occured while updating post" };
  }

  revalidatePath(`/admin/editor/${postData.slug}`);
}

export async function deletePost(slug: string) {
  try {
    await db.delete(post).where(eq(post.slug, slug));
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    else return { error: "Unexpected error occured while deleting post" };
  }

  revalidatePath(`/admin/editor/${slug}`);
}
