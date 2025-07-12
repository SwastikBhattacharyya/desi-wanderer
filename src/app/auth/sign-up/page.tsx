import Link from "next/link";
import { SignUpForm } from "./_components/sign-up-form";

export default function SignUp() {
  return (
    <>
      <div className="flex flex-col gap-y-1 lowercase select-none">
        <h1>Sign Up</h1>
        <p className="font-light text-on-background/70">
          Create an account to get started
        </p>
      </div>
      <SignUpForm />
      <div className="flex gap-x-1 lowercase">
        <p>Already have an account?</p>
        <Link href="/auth/sign-in">Sign In</Link>
      </div>
    </>
  );
}
