"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInGoogle() {
  const successParams = new URLSearchParams({
    toastId: "googleSignInSuccessful",
  });
  const errorParams = new URLSearchParams({
    toastId: "googleSignInError",
  });

  const result = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: `/?${successParams.toString()}`,
      errorCallbackURL: `/?${errorParams.toString()}`,
    },
    headers: await headers(),
  });

  if (!result.redirect || !result.url)
    return {
      success: false,
      message: "An unexpected error occured while signing in, please try again",
    };

  redirect(result.url);
}
