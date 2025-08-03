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
    redirect(`/?${params.toString()}`);
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={data.user} />
      <SidebarInset className="h-dvh overflow-hidden">
        <SidebarTrigger />
        <main className="h-full px-4">
          <Suspense>{children}</Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
