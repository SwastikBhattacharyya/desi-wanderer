"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { hasPermissions } from "../functions/has-permissions";

export async function setRole(userId: string, role: "adminRole" | "userRole") {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userSession)
    return {
      success: false,
      message: "You must be signed in to perform this action",
    };

  if (!(await hasPermissions(userSession.user.id, { user: ["set-role"] })))
    return {
      success: false,
      message: "You do not have the permissions to perform this action",
    };

  try {
    await db.update(user).set({ role: role }).where(eq(user.id, userId));
  } catch {
    return {
      success: false,
      message:
        "An unexpected error occured while setting role, please try again",
    };
  }

  revalidateTag("users");
  return { success: true, message: "Updated role successfully" };
}
