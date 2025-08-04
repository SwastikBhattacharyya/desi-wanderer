"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { safeParse } from "zod";
import { signInSchema, SignInType } from "../../schemas/sign-in";

export async function signIn(data: SignInType) {
  const parseResult = safeParse(signInSchema, data);
  if (!parseResult.success)
    return { success: false, message: parseResult.error.issues[0].message };

  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError)
      return { success: false, message: error.message };
    else
      return {
        success: false,
        message:
          "An unexpected error occured while signing in, please try again",
      };
  }

  revalidateTag("users");
  return { success: true, message: "Signed in successfully" };
}
