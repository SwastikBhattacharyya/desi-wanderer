"use server";

import { db } from "@/db";
import { image } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/functions/has-permissions";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { safeParse } from "zod";
import { editImageSchema, EditImageType } from "../../schemas/edit-image";

export async function editImage(id: string, data: EditImageType) {
  const parseResult = safeParse(editImageSchema, data);
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

  if (await hasPermissions(userSession.user.id, { image: ["edit:own"] })) {
    await db
      .update(image)
      .set(data)
      .where(and(eq(image.id, id), eq(image.uploaderId, userSession.user.id)));
  } else if (
    await hasPermissions(userSession.user.id, { image: ["edit:any"] })
  ) {
    await db.update(image).set(data).where(eq(image.id, id));
  } else {
    return {
      success: false,
      message: "You do not have the permissions to perform this action",
    };
  }

  revalidateTag("images");
  return { success: true, message: "Edited image successfully" };
}
