import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data?.session) {
    const params = new URLSearchParams({ toastId: "pageRequiresSession" });
    redirect(`/auth/sign-in?${params.toString()}`);
  }

  return <></>;
}
