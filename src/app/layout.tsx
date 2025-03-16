import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desi Wanderer",
  description:
    "Explore the latest travel stories, tips, and destinations across India with Desi Wanderer – your go-to platform for authentic Indian travel experiences!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
        <Toaster closeButton expand richColors />
      </body>
    </html>
  );
}
