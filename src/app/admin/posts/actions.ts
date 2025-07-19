"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { actionWithUser, validatedActionWithUser } from "@/lib/validation";
import { inArray } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { newPostSchema } from "./types";

export const createPost = validatedActionWithUser(
  newPostSchema,
  async (data, userSession) => {
    try {
      await db.insert(post).values({
        title: data.title === "" ? null : data.title,
        description: data.description === "" ? null : data.title,
        authorId: userSession.id,
        published: false,
      });
    } catch {
      return {
        success: false,
        message:
          "An unexpected error occured while creating new post, please try again",
      };
    }

    revalidateTag("posts");
    return { success: true, message: "Successfully created new post" };
  },
);

type DeletePostsParams = string[];

export const deletePosts = actionWithUser<DeletePostsParams>(
  async (_, postIds) => {
    try {
      await db.delete(post).where(inArray(post.id, postIds));
    } catch {
      return {
        success: false,
        message:
          "An unexpected error occured while deleting post, please try again",
      };
    }

    revalidateTag("posts");
    return { success: true, message: "Successfully deleted post(s)" };
  },
);
