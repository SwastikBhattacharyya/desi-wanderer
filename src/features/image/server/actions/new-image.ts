"use server";

import { db } from "@/db";
import { image } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/functions/has-permissions";
import { auth } from "@/lib/auth";
import { bucketName, storage } from "@/lib/storage";
import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { safeParse } from "zod";
import { newImageSchema, NewImageType } from "../../schemas/new-image";

export async function newImage(data: NewImageType) {
  const parseResult = safeParse(newImageSchema, data);
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

  if (!(await hasPermissions(userSession.user.id, { image: ["upload"] })))
    return {
      success: false,
      message: "You do not have the permissions to perform this action",
    };

  const file = data.image;
  const filename = randomUUID();
  const [url] = await storage
    .bucket(bucketName)
    .file(filename)
    .getSignedUrl({
      action: "write",
      version: "v4",
      expires: Date.now() + 2 * 60 * 1000,
      contentType: file.type,
    });

  const response = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!response.ok)
    return {
      success: false,
      message:
        "An unexpected error occured while uploading image to cloud storage, please try again",
    };

  try {
    await db.insert(image).values({
      title: data.title,
      alt: data.alt,
      url: `https://storage.googleapis.com/${bucketName}/${filename}`,
      filename,
      uploaderId: userSession.user.id,
    });
  } catch {
    return {
      success: false,
      message:
        "An unexpected error occured while uploading image, please try again",
    };
  }

  revalidateTag("images");
  return { success: true, message: "Uploaded image successfully" };
}
