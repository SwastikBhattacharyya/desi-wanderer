"use server";

import { db } from "@/db";
import { post, user } from "@/db/schema";
import { validatedActionWithUser } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";
import { PostType, newPostSchema } from "./types";

export async function getPostsTableData() {
  "use cache";

  const rows: PostType[] = await db
    .select({
      id: post.id,
      slug: post.slug,
      title: post.title,
      authorName: user.name,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
    .from(post)
    .innerJoin(user, eq(user.id, post.authorId));

  cacheTag("posts");
  return rows;
}

export const createPost = validatedActionWithUser(
  newPostSchema,
  async (data, user) => {
    try {
      await db.insert(post).values({
        title: data.title === "" ? null : data.title,
        description: data.description === "" ? null : data.title,
        authorId: user.id,
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
