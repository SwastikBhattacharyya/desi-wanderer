import z from "zod";

export type PostType = {
  id: string;
  title: string;
  description: string;
  author: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  actions?: unknown;
};

export const newPostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must contain at least 5 character(s)" })
    .max(60, { message: "Title must contain at most 60 character(s)" }),
  description: z
    .string()
    .min(30, { message: "Description must contain at least 30 character(s)" })
    .max(150, { message: "Description must contain at most 150 character(s)" }),
});

export type NewPostType = z.infer<typeof newPostSchema>;
