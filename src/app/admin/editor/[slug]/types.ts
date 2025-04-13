import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters long")
    .max(150, "Title must be at most 150 characters long"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters long")
    .max(150, "Description must be at most 150 characters long"),
});

export type Post = z.infer<typeof postSchema>;
