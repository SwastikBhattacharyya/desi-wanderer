"use server";

import { auth } from "@/lib/auth";
import { AppPermissions } from "@/lib/permissions";
import { headers } from "next/headers";

export async function hasPermissions(
  userId: string,
  permissions: AppPermissions,
) {
  const result = await auth.api.userHasPermission({
    body: { userId, permissions },
    headers: await headers(),
  });
  return result.success;
}
