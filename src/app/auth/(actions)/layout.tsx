import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default async function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (data?.session) {
    const params = new URLSearchParams({ toastId: "authAlreadySignedIn" });
    redirect(`/?${params.toString()}`);
  }

  return (
    <div className="relative h-dvh w-dvw">
      <Image
        className="-z-10 hidden object-cover object-center brightness-60 sm:block"
        src="/victoria-memorial.jpg"
        alt="Victoria Memorial Museum in Kolkata, India"
        fill={true}
      />
      <div className="absolute -z-10 h-dvh w-dvw bg-white/15" />
      <main className="flex h-full items-center-safe justify-center-safe lg:justify-start">
        <section className="flex w-full max-w-[500px] flex-col gap-y-4 rounded-md p-8 sm:w-[50dvw] sm:min-w-[500px] lg:h-full lg:p-0">
          <Suspense>{children}</Suspense>
        </section>
      </main>
    </div>
  );
}
