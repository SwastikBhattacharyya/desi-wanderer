import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, "Please enter the password of your account"),
});

export type SignInType = z.infer<typeof signInSchema>;
