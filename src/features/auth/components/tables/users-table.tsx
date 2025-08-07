import { db } from "@/db";
import { user } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/functions/has-permissions";
import { unstable_cache } from "next/cache";
import { UsersGrid } from "./users-grid";

export async function UsersTable({ userId }: { userId: string }) {
  const getAllUsers = unstable_cache(
    async () => {
      const users = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          banned: user.banned,
          role: user.role,
        })
        .from(user);

      return users;
    },
    ["users", "any", userId],
    { tags: ["users"] },
  );
  const getUsers = async () => {
    if (await hasPermissions(userId, { user: ["read:any"] }))
      return getAllUsers();
    else return [];
  };
  const users = await getUsers();

  return <UsersGrid posts={users} userId={userId} />;
}
