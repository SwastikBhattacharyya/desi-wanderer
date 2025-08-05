import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { User } from "better-auth";
import Image from "next/image";
import { AdminSidebarNav } from "./nav";
import { UserProfile } from "./user-profile";

export function AdminSidebar({
  user,
  userRole,
}: {
  user: User;
  userRole: string;
}) {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center-safe gap-y-2">
        <Image
          className="pointer-events-none"
          src="/logo.png"
          alt="Desi Wanderer"
          width={125}
          height={125}
        />
        <div className="flex flex-col items-center-safe">
          <h3 className="text-center text-2xl">Desi Wanderer</h3>
          <p className="text-center text-sm">Administrator Panel</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <AdminSidebarNav userRole={userRole} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col">
        <UserProfile user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
