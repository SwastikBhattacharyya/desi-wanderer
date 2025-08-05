"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/actions/has-permissions";
import { auth } from "@/lib/auth";
import { and, eq, inArray } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function deletePosts(postIds: string[]) {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userSession)
    return {
      success: false,
      message: "You must be signed in to perform this action",
    };

  try {
    if (await hasPermissions(userSession.user.id, { post: ["delete:any"] })) {
      const res = await db.delete(post).where(inArray(post.id, postIds));
      revalidateTag("posts");
      return {
        success: true,
        message: `Deleted ${res.rowCount} post(s)`,
      };
    } else if (
      await hasPermissions(userSession.user.id, { post: ["delete:own"] })
    ) {
      const res = await db
        .delete(post)
        .where(
          and(
            inArray(post.id, postIds),
            eq(post.authorId, userSession.user.id),
          ),
        );
      revalidateTag("posts");
      return {
        success: true,
        message: `Deleted ${res.rowCount} post(s)`,
      };
    } else
      return {
        success: false,
        message: "You do not have the permissions to perform this action",
      };
  } catch {
    return {
      success: false,
      message:
        "An unexpected error occured while deleting post(s), please try again",
    };
  }
}
