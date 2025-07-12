import Link from "next/link";
import { SignInForm } from "./_components/sign-in-form";

export default function SignIn() {
  return (
    <>
      <div className="flex flex-col gap-y-1 lowercase select-none">
        <h1>Sign In</h1>
        <p className="font-light text-on-background/70">
          Welcome back! Please enter your details{" "}
        </p>
      </div>
      <SignInForm />
      <div className="flex gap-x-1 lowercase">
        <p>Don&apos;t have an account?</p>
        <Link href="/auth/sign-up">Sign Up</Link>
      </div>
    </>
  );
}
