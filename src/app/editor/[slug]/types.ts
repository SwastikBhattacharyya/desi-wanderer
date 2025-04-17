import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters long")
    .max(150, "Title must be at most 150 characters long"),
  slug: z.string().min(5, "Slug must be at least 5 characters long"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters long")
    .max(150, "Description must be at most 150 characters long"),
  published: z.boolean(),
});

export type Post = z.infer<typeof postSchema>;
