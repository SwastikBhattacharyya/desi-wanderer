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
import { newPostSchema, NewPostType } from "../../schemas/new-post";
import { newPost } from "../../server/actions/new-post";

export function NewPostForm({
  setSheetOpen,
}: {
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<NewPostType>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: NewPostType) {
    const action = newPost(values);
    toast.promise(
      async () => {
        const result = await action;
        if (result.success) {
          form.reset();
          return result.message;
        } else throw new Error(result.message);
      },
      {
        loading: "Creating new post...",
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Description"
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
