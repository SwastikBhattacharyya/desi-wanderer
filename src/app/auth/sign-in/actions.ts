"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { User } from "./types";

export async function signIn(formData: User) {
  try {
    await auth.api.signInEmail({
      body: {
        email: formData.email,
        password: formData.password,
      },
    });
  } catch (error) {
    if (error instanceof APIError) return { error: error.message };
    else return { error: "Unexpected error occured while signing in user" };
  }
}
