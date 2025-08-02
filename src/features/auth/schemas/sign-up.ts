import { z } from "zod";

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Full Name must contain at least 2 character(s)" }),
    email: z.email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(1, "Please enter a password for your account")
      .min(8, "Password must contain at least 8 character(s)")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number")
      .regex(
        /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/,
        "Password must contain at least 1 special character",
      ),
    confirmPassword: z.string().min(1, "Please enter the password again"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof signUpSchema>;
