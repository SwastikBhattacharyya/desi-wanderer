import z from "zod";

export const editImageSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must contain at least 5 character(s)" })
    .max(60, { message: "Title must contain at most 60 character(s)" }),
  alt: z
    .string()
    .min(15, {
      message: "Alt description must contain at least 15 character(s)",
    })
    .max(125, {
      message: "Alt description must contain at most 125 character(s)",
    }),
});

export type EditImageType = z.infer<typeof editImageSchema>;
