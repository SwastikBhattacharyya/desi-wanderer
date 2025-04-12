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
import { TextAlign } from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Loader2 } from "lucide-react";
import * as motion from "motion/react-client";
import { useForm } from "react-hook-form";
import { Post, postSchema } from "../types";

export default function EditorForm() {
  const form = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Write your content here</p>",
    editorProps: {
      attributes: {
        class:
          "p-4 bg-slate-50 rounded-md outline-none border focus:border-black transition-colors duration-300 h-[100%]",
      },
    },
    immediatelyRender: false,
  });

  async function onSubmit(formData: Post) {
    const content = editor?.getHTML();
    const data = {
      ...formData,
      content,
    };
    console.log("Form Data: ", data);
  }

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col gap-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
                <MenuBar editor={editor} />
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
            <Button className="cursor-pointer bg-red-600 transition-colors hover:bg-red-700">
              Delete
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 1.0 }}
          >
            {!form.formState.isSubmitting ? (
              <Button
                className="cursor-pointer transition-colors"
                type="submit"
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
