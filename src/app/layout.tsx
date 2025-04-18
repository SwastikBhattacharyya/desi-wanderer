import CookieToaster from "@/components/ui/cookie-toaster";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desi Wanderer",
  description:
    "Explore the latest travel stories, tips, and destinations across India with Desi Wanderer – your go-to platform for authentic Indian travel experiences!",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#f8f8f8]`}>
        <main className="relative">{children}</main>
        <Toaster closeButton expand richColors />
        <CookieToaster />
      </body>
    </html>
  );
}
