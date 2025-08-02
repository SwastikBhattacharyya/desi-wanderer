import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desi Wanderer",
  description:
    "Explore the latest travel stories, tips, and destinations across India with Desi Wanderer - your go-to platform for authentic Indian travel experiences!",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", openSans.variable)}>{children}</body>
    </html>
  );
}
