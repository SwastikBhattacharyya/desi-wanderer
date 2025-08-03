"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { safeParse } from "zod";
import { newPostSchema, NewPostType } from "../../schemas/new-post";

export async function newPost(data: NewPostType) {
  const parseResult = safeParse(newPostSchema, data);
  if (!parseResult.success)
    return { success: false, message: parseResult.error.issues[0].message };

  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userSession)
    return {
      success: false,
      message: "You must be signed in to perform this action",
    };

  try {
    await db.insert(post).values({
      title: data.title,
      description: data.description,
      authorId: userSession.user.id,
    });
  } catch {
    return {
      success: false,
      message:
        "An unexpected error occured while creating new post, please try again",
    };
  }

  revalidateTag("posts");
  return { success: true, message: "Created new post successfully" };
}
