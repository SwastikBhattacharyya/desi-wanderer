"use client";

import Tiptap from "@/components/rich-text-editor/tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
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
      content: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex h-full flex-col gap-y-4">
        <div className="flex w-full flex-col gap-y-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.4 }}
              >
                <FormItem className="flex flex-col gap-y-1">
                  <FormControl>
                    <Input
                      className="selection:bg-orange-500 placeholder:text-gray-300/60"
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
                <FormItem className="flex flex-col gap-y-1">
                  <FormControl>
                    <Input
                      className="selection:bg-orange-500 placeholder:text-gray-300/60"
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
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <motion.div
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.8 }}
            >
              <FormItem className="flex h-full min-h-[300px] flex-col gap-y-1">
                <FormControl>
                  <Tiptap />
                </FormControl>
                <FormMessage />
              </FormItem>
            </motion.div>
          )}
        />
        <div className="flex w-full items-center justify-between gap-x-2">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 1.0 }}
          >
            <Button className="cursor-pointer bg-red-600 transition-colors hover:bg-red-700">
              Delete Post
            </Button>
          </motion.div>
        </div>
      </form>
    </Form>
  );
}
