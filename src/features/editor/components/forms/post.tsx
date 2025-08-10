"use client";

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
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useScreenWidth } from "../../hooks/use-screen-width";
import { PostType } from "../../schemas/post";
import { SavePostType, savePostSchema } from "../../schemas/save-post";
import { saveDraft } from "../../server/actions/save-draft";

export function PostForm({
  post,
  children,
}: {
  post: PostType;
  children: ReactNode;
}) {
  const form = useForm<SavePostType>({
    resolver: zodResolver(savePostSchema),
    defaultValues: {
      title: post.title,
      description: post.description,
      content: post.content,
    },
  });
  const isScreenSmall = useScreenWidth(1366);

  async function onSubmit(values: SavePostType) {
    const action = saveDraft(post.id, values);
    toast.promise(
      async () => {
        const result = await action;
        if (result.success) {
          return result.message;
        } else throw new Error(result.message);
      },
      {
        loading: "Saving Draft...",
        success: (message) => message,
        error: (error: Error) => error.message,
      },
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col gap-y-6 px-1 [@media(min-height:720px)]:overflow-hidden"
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
                  {isScreenSmall ? (
                    <Textarea
                      disabled={form.formState.isSubmitting}
                      placeholder="Description"
                      rows={2}
                      {...field}
                    />
                  ) : (
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Description"
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {children}
      </form>
    </Form>
  );
}
