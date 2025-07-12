"use server";

import { auth } from "@/lib/auth";
import { validatedAction } from "@/lib/validation";
import { APIError } from "better-auth/api";
import { signUpSchema } from "./types";

export const signUp = validatedAction(signUpSchema, async (data) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name: data.fullName,
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
          "An unexpected error occured while signing up, please try again",
      };
  }

  return { success: true, message: "Signed up successfully" };
});
