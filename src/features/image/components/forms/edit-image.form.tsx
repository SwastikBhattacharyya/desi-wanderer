import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editImageSchema, EditImageType } from "../../schemas/edit-image";
import { ImageType } from "../../schemas/image";
import { editImage } from "../../server/actions/edit-image";
import { DeleteImage } from "../dialogs/delete-image";

export function EditImageForm({
  image,
  setSheetOpen,
}: {
  image: ImageType;
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<EditImageType>({
    resolver: zodResolver(editImageSchema),
    defaultValues: {
      title: image.title,
      alt: image.alt,
    },
  });

  async function onEditSubmit(values: EditImageType) {
    const action = editImage(image.id, values);
    toast.promise(
      async () => {
        const result = await action;
        if (result.success) {
          return result.message;
        } else throw new Error(result.message);
      },
      {
        loading: "Editing image...",
        success: (message) => message,
        error: (error: Error) => error.message,
      },
    );

    const result = await action;
    if (result.success) setSheetOpen(false);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-6"
        onSubmit={form.handleSubmit(onEditSubmit)}
      >
        <div className="flex flex-col gap-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting}
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alt Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Alt Description"
                    disabled={form.formState.isSubmitting}
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Button
            className="cursor-pointer font-bold"
            type="submit"
            onClick={() => {
              form.handleSubmit(onEditSubmit);
            }}
            disabled={form.formState.isSubmitting}
          >
            Edit
          </Button>
          <DeleteImage id={image.id} />
        </div>
      </form>
    </Form>
  );
}
