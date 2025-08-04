"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { House, PencilLine, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSidebarNav({ userRole }: { userRole: string }) {
  const pathName = usePathname();
  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: House,
    },
    {
      title: "Posts",
      url: "/admin/posts",
      icon: PencilLine,
    },
    ...(userRole === "adminRole"
      ? [
          {
            title: "Users",
            url: "/admin/users",
            icon: User,
          },
        ]
      : []),
  ];

  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.url}>
          <SidebarMenuButton asChild isActive={item.url === pathName}>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
