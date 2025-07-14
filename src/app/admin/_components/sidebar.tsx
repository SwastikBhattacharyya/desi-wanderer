import { cn } from "@/lib/cn";
import { IconHome, IconNews } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, ReactElement, ReactNode } from "react";
import { AdminPageType } from "../types";
import {
  SidebarContainer,
  SidebarOpenButton,
  SidebarProvider,
} from "./sidebar-client";

const pageConfig: Record<
  AdminPageType,
  {
    name: string;
    link: string;
    icon: ReactElement;
  }
> = {
  admin: {
    name: "Dashboard",
    link: "/admin",
    icon: <IconHome className="size-5" />,
  },
  posts: {
    name: "Posts",
    link: "/admin/posts",
    icon: <IconNews className="size-5" />,
  },
};

function SidebarContent({ page }: { page: AdminPageType }) {
  return (
    <div className="flex flex-col items-center-safe gap-y-8">
      <div className="flex flex-col items-center-safe gap-y-4 p-4 select-none">
        <Image
          className="pointer-events-none"
          src="/logo.png"
          alt="Desi Wanderer"
          width={150}
          height={150}
        />
        <div className="flex flex-col items-center-safe lowercase">
          <h3 className="text-center">Desi Wanderer</h3>
          <p className="text-center font-light text-on-surface/70">
            Administrator Panel
          </p>
        </div>
      </div>
      <nav className="w-full list-none lowercase select-none">
        <ul>
          {Object.keys(pageConfig).map((key) => (
            <li
              key={key}
              className={cn(
                "w-full transition-[background] duration-200 hover:bg-secondary/40",
                {
                  "bg-secondary hover:bg-secondary": key === page,
                },
              )}
            >
              <Link
                className="flex h-full w-full items-center-safe justify-center-safe gap-x-2 py-3 text-lg text-on-surface no-underline"
                href={pageConfig[key as AdminPageType].link}
              >
                {pageConfig[key as AdminPageType].icon}
                <div>{pageConfig[key as AdminPageType].name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export function SidebarLayout({
  children,
  page,
}: {
  children: ReactNode;
  page: AdminPageType;
}) {
  return (
    <SidebarProvider>
      <div className="sm:flex">
        <SidebarContainer>
          <SidebarContent page={page} />
        </SidebarContainer>
        <div className="flex h-dvh flex-col overflow-y-hidden sm:grow">
          <main className="flex h-full flex-col items-center-safe gap-y-4 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function SidebarHeader({
  page,
  className,
  children,
}: ComponentProps<"div"> & {
  page: AdminPageType;
}) {
  return (
    <header
      className={cn("flex w-full items-center-safe select-none", className)}
    >
      <div className="flex items-center-safe justify-center-safe gap-x-2 px-2">
        <SidebarOpenButton />
        <h3 className="align-top">{pageConfig[page].name}</h3>
      </div>
      {children}
    </header>
  );
}
