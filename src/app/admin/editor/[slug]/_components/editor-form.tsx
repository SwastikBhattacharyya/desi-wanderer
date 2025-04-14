"use client";

import MenuBar from "@/components/rich-text-editor/menu-bar";
import RichTextEditor from "@/components/rich-text-editor/rich-text-editor";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";
import { Loader2 } from "lucide-react";
import * as motion from "motion/react-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { deletePost, updatePost } from "../actions";
import { Post, postSchema } from "../types";

type EditorFormProps = {
  slug: string;
  title: string;
  description: string;
  content: string;
  editor: Editor | null;
  isImageWindowOpen: boolean;
  setIsImageWindowOpen: (isOpen: boolean) => void;
};

export default function EditorForm(props: EditorFormProps) {
  const form = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: props.title,
      description: props.description,
    },
  });

  const { editor } = props;

  const { isImageWindowOpen, setIsImageWindowOpen } = props;

  useEffect(() => {
    editor?.setEditable(!isImageWindowOpen);
  }, [isImageWindowOpen, editor]);

  const router = useRouter();

  async function onUpdate(formData: Post) {
    const content = editor?.getHTML();

    if (!content) {
      toast.error("Please write some content");
      return;
    }

    const data = {
      ...formData,
      slug: props.slug,
      content,
    };
    const response = await updatePost(data);
    if (response?.error) toast.error(response.error);
    else toast.success("Post updated successfully");
  }

  async function onDelete() {
    const response = await deletePost(props.slug);
    if (response?.error) toast.error(response.error);
    else {
      toast.success("Post deleted successfully");
      router.push("/admin");
    }
  }

  return (
    <Form {...form}>
      <form id="editor-form" className="flex h-full flex-col gap-y-6">
        <div className="flex w-full flex-col gap-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.4 }}
              >
                <FormItem className="flex flex-col gap-y-0.5">
                  <FormLabel className="text-md font-bold">Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isImageWindowOpen}
                      className="bg-slate-50 selection:bg-orange-500 placeholder:text-gray-400"
                      type="text"
                      placeholder="Post Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.6 }}
              >
                <FormItem className="flex flex-col gap-y-0.5">
                  <FormLabel className="text-md font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isImageWindowOpen}
                      className="bg-slate-50 selection:bg-orange-500 placeholder:text-gray-400"
                      type="text"
                      placeholder="Post Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
        </div>
        <motion.div
          className="h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.8 }}
        >
          <FormItem className="flex h-full min-h-[300px] flex-col gap-y-1">
            <FormControl>
              <div className="flex h-full flex-col">
                <MenuBar
                  editor={editor}
                  isImageSelectorOpen={isImageWindowOpen}
                  setIsImageSelectorOpen={setIsImageWindowOpen}
                />
                <RichTextEditor editor={editor} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </motion.div>
        <div className="flex w-full items-center justify-between gap-x-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 1.0 }}
          >
            {!form.formState.isSubmitting ? (
              <Button
                disabled={isImageWindowOpen}
                form="editor-form"
                onClick={form.handleSubmit(onDelete)}
                className="cursor-pointer bg-red-600 transition-colors hover:bg-red-700"
                value="delete"
              >
                Delete
              </Button>
            ) : (
              <Button disabled className="w-full cursor-not-allowed">
                <Loader2 className="animate-spin" />
                Please wait...
              </Button>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 1.0 }}
          >
            {!form.formState.isSubmitting ? (
              <Button
                disabled={isImageWindowOpen}
                form="editor-form"
                onClick={form.handleSubmit(onUpdate)}
                className="cursor-pointer transition-colors"
                type="submit"
                value="update"
              >
                Submit
              </Button>
            ) : (
              <Button disabled className="w-full cursor-not-allowed">
                <Loader2 className="animate-spin" />
                Please wait...
              </Button>
            )}
          </motion.div>
        </div>
      </form>
    </Form>
  );
}
