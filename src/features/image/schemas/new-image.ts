import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const newImageSchema = z.object({
  image: z
    .instanceof(File, {
      message: "Please select an image file.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than 5 MB.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    }),
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

export type NewImageType = z.infer<typeof newImageSchema>;
