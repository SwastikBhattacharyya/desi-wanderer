"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { House, Image, PencilLine, User } from "lucide-react";
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
      urlInclude: "/admin/posts/editor",
      icon: PencilLine,
    },
    {
      title: "Images",
      url: "/admin/images",
      icon: Image,
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
          <SidebarMenuButton
            asChild
            isActive={
              pathName === item.url ||
              (item.urlInclude !== undefined &&
                pathName.includes(item.urlInclude))
            }
          >
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
