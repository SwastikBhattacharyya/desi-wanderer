"use server";

import { User } from "better-auth";
import { headers } from "next/headers";
import { auth } from "./auth";
import { Permissions } from "./permissions";

export async function getUser() {
  return await auth.api.getSession({ headers: await headers() });
}

export async function hasPermission(
  permissions: Permissions,
  userSession?: User,
) {
  const session = userSession ?? (await getUser())?.user;
  const result = await auth.api.userHasPermission({
    body: {
      userId: session?.id,
      permissions: permissions,
    },
  });

  return result.success;
}
