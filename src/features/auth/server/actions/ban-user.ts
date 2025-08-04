"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { hasPermissions } from "./has-permissions";

export async function banUser(userId: string, reason: string) {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userSession)
    return {
      success: false,
      message: "You must be signed in to perform this action",
    };

  if (!(await hasPermissions(userSession.user.id, { user: ["ban"] })))
    return {
      success: false,
      message: "You do not have the permissions to perform this action",
    };

  try {
    await auth.api.banUser({
      body: {
        userId: userId,
        banReason: reason,
      },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError)
      return {
        success: false,
        message: error.message,
      };
    else
      return {
        success: false,
        message:
          "An unexpected error occured while setting role, please try again",
      };
  }

  revalidateTag("users");
  return { success: true, message: "Banned user successfully" };
}
