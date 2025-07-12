"use server";

import { auth } from "@/lib/auth";
import { validatedAction } from "@/lib/validation";
import { APIError } from "better-auth/api";
import { signInSchema } from "./types";

export const signIn = validatedAction(signInSchema, async (data) => {
  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
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

  return { success: true, message: "Signed in successfully" };
});
