import { cn } from "@/lib/cn";
import type { Metadata } from "next";
import { Archivo, Montserrat } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desi Wanderer",
  description:
    "Explore the latest travel stories, tips, and destinations across India with Desi Wanderer - your go-to platform for authentic Indian travel experiences!",
};

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(archivo.variable, montserrat.variable)}>
        <div id="body">{children}</div>
        <aside>
          <Toaster containerClassName="select-none" position="bottom-right" />
        </aside>
      </body>
    </html>
  );
}
