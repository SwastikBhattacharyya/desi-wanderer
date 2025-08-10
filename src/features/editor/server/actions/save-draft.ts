"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/functions/has-permissions";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { safeParse } from "zod";
import { SavePostType, savePostSchema } from "../../schemas/save-post";

export async function saveDraft(id: string, data: SavePostType) {
  const parseResult = safeParse(savePostSchema, data);
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

  if (await hasPermissions(userSession.user.id, { post: ["edit:own"] })) {
    await db
      .update(post)
      .set(data)
      .where(and(eq(post.id, id), eq(post.authorId, userSession.user.id)));
  } else if (
    await hasPermissions(userSession.user.id, { post: ["edit:any"] })
  ) {
    await db.update(post).set(data).where(eq(post.id, id));
  } else {
    return {
      success: false,
      message: "You do not have the permissions to perform this action",
    };
  }

  revalidateTag("posts");
  return { success: true, message: "Draft saved successfully" };
}
