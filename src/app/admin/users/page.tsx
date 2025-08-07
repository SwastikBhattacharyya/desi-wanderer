import { UsersTable } from "@/features/auth/components/tables/users-table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Users() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data?.session) {
    const params = new URLSearchParams({ toastId: "pageRequiresSession" });
    redirect(`/auth/sign-in?${params.toString()}`);
  }

  if (data.user.role !== "adminRole") {
    const params = new URLSearchParams({ toastId: "pageRequiresPermission" });
    redirect(`/admin?${params.toString()}`);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center-safe justify-between gap-x-4">
        <h1 className="text-4xl">Users</h1>
      </div>
      <UsersTable userId={data.user.id} />
    </div>
  );
}
