"use server";

import { db } from "@/db";
import { image } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/functions/has-permissions";
import { auth } from "@/lib/auth";
import { bucketName, storage } from "@/lib/storage";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

export async function deleteImage(id: string) {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userSession)
    return {
      success: false,
      message: "You must be signed in to perform this action",
    };

  if (await hasPermissions(userSession.user.id, { image: ["delete:own"] })) {
    const deleted = await db
      .delete(image)
      .where(and(eq(image.id, id), eq(image.uploaderId, userSession.user.id)))
      .returning({ filename: image.filename });

    if (deleted.length === 0)
      return {
        success: false,
        message: "No image found to be deleted",
      };

    if (deleted.length > 1)
      return {
        success: false,
        message: "Invalid image delete request",
      };

    const [url] = await storage
      .bucket(bucketName)
      .file(deleted[0].filename)
      .getSignedUrl({
        action: "delete",
        version: "v4",
        expires: Date.now() + 15 * 60 * 1000,
      });

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok)
      return {
        success: false,
        message:
          "An unexpected error occured while deleting image in cloud storage, please try again",
      };
  } else if (
    await hasPermissions(userSession.user.id, { image: ["delete:any"] })
  ) {
    const deleted = await db
      .delete(image)
      .where(eq(image.id, id))
      .returning({ filename: image.filename });

    if (deleted.length === 0)
      return {
        success: false,
        message: "No image found to be deleted",
      };

    if (deleted.length > 1)
      return {
        success: false,
        message: "Invalid image delete request",
      };

    const [url] = await storage
      .bucket(bucketName)
      .file(deleted[0].filename)
      .getSignedUrl({
        action: "delete",
        version: "v4",
        expires: Date.now() + 2 * 60 * 1000,
      });

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok)
      return {
        success: false,
        message:
          "An unexpected error occured while deleting image in cloud storage, please try again",
      };
  } else {
    return {
      success: false,
      message: "You do not have the permissions to perform this action",
    };
  }

  revalidateTag("images");
  return { success: true, message: "Deleted image successfully" };
}
