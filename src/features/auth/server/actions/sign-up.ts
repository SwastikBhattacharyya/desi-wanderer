"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { safeParse } from "zod";
import { signUpSchema, SignUpType } from "../../schemas/sign-up";

export async function signUp(data: SignUpType) {
  const parseResult = safeParse(signUpSchema, data);
  if (!parseResult.success)
    return { success: false, message: parseResult.error.issues[0].message };

  const reqHeaders = await headers();

  try {
    await auth.api.signUpEmail({
      body: {
        name: data.fullName,
        email: data.email,
        password: data.password,
      },
      headers: reqHeaders,
    });
  } catch (error) {
    if (error instanceof APIError)
      return { success: false, message: error.message };
    else
      return {
        success: false,
        message:
          "An unexpected error occured while signing up, please try again",
      };
  }

  const verificationParams = new URLSearchParams({
    toastId: "emailVerified",
  });

  auth.api.sendVerificationEmail({
    body: {
      email: data.email,
      callbackURL: `/auth/sign-in?${verificationParams.toString()}`,
    },
    headers: reqHeaders,
  });

  return {
    success: true,
    message: "Signed up successfully. Please verify your email to sign in",
  };
}
