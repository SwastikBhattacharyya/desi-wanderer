import z from "zod";

export const banUserSchema = z.object({
  reason: z
    .string()
    .min(2, "Reason must contain at least 2 character(s)")
    .max(30, "Reason must contain at most 30 character(s)"),
});

export type BanUserType = z.infer<typeof banUserSchema>;
