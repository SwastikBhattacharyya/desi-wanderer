import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data?.session) {
    const params = new URLSearchParams({ toastId: "pageRequiresSession" });
    redirect(`/auth/sign-in?${params.toString()}`);
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={data.user} userRole={data.user.role ?? "userRole"} />
      <SidebarInset className="h-dvh overflow-hidden">
        <SidebarTrigger />
        <div className="h-full overflow-y-auto px-4">
          <Suspense>{children}</Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
