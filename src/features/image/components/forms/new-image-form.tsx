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
import { newImageSchema, NewImageType } from "../../schemas/new-image";
import { newImage } from "../../server/actions/new-image";

export function NewImageForm({
  setSheetOpen,
}: {
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<NewImageType>({
    resolver: zodResolver(newImageSchema),
    defaultValues: {
      title: "",
      alt: "",
    },
  });

  async function onSubmit(values: NewImageType) {
    const action = newImage(values);
    toast.promise(
      async () => {
        const result = await action;
        if (result.success) {
          form.reset();
          return result.message;
        } else throw new Error(result.message);
      },
      {
        loading: "Uploading image...",
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
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-3">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <Button
          className="cursor-pointer font-bold"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Add
        </Button>
      </form>
    </Form>
  );
}
