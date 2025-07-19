import z from "zod";

export const newPostSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type PostType = {
  id: string;
  slug: string | null;
  title: string | null;
  authorName: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};
