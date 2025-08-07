import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonGoogle } from "@/features/auth/components/buttons/button-google";
import { SignUpForm } from "@/features/auth/components/forms/sign-up";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (data?.session) {
    const params = new URLSearchParams({ toastId: "authAlreadySignedIn" });
    redirect(`/?${params.toString()}`);
  }

  return (
    <Card className="flex flex-col justify-center-safe border-none shadow-none lg:h-full lg:rounded-none lg:px-4">
      <CardHeader>
        <CardTitle className="text-4xl">Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <SignUpForm />
        <div className="flex gap-x-1">
          <p>Already have an account?</p>
          <Link className="font-bold text-primary" href="/auth/sign-in">
            Sign In
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        <ButtonGoogle />
      </CardFooter>
    </Card>
  );
}
