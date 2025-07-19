import Image from "next/image";
import { ReactNode } from "react";
import { AuthFooter } from "./_components/auth-footer";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="relative h-dvh w-dvw">
      <Image
        className="-z-10 object-cover object-center blur-md brightness-40"
        src="/auth-background.jpg"
        alt="A stunning view of the Taj Mahal during sunset, surrounded by colorful skies and a peaceful ambiance."
        fill={true}
      />
      <main className="flex h-full items-center-safe justify-center-safe">
        <div className="flex w-full max-w-[500px] flex-col gap-y-4 rounded-md p-8 sm:w-[50dvw]">
          {children}
          <AuthFooter />
        </div>
      </main>
    </div>
  );
}
