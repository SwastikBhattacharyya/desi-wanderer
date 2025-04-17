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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";
import { Loader2 } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEditorContext } from "../_contexts/editor-context";
import { deletePost, updatePost } from "../actions";
import { Post, postSchema } from "../types";

type EditorFormProps = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  editor: Editor | null;
  masterImage: string;
  isImageWindowOpen: boolean;
  setIsImageWindowOpen: (isOpen: boolean) => void;
};

export default function EditorForm(props: EditorFormProps) {
  const form = useForm<Post>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      slug: props.slug,
      title: props.title,
      description: props.description,
      published: false,
    },
  });

  const { editor } = props;
  const { isImageWindowOpen, setIsImageWindowOpen } = props;
  const { masterImageUrl, setIsMasterImageSelectorOpen, setMasterImageUrl } =
    useEditorContext();

  useEffect(() => {
    editor?.setEditable(!isImageWindowOpen);
  }, [isImageWindowOpen, editor]);

  useEffect(() => {
    setMasterImageUrl(props.masterImage);
  }, [setMasterImageUrl, props.masterImage]);

  const router = useRouter();

  async function onSaveDraft(formData: Post) {
    const content = editor?.getHTML();

    if (!content) {
      toast.error("Please write some content");
      return;
    }

    const data = {
      ...formData,
      id: props.id,
      oldSlug: props.slug,
      newSlug: formData.slug,
      content,
      published: false,
      masterImage: masterImageUrl === "" ? null : masterImageUrl,
    };

    const response = await updatePost(data);
    if (response?.error) toast.error(response.error);
    else toast.success("Post updated successfully");

    if (data.oldSlug !== data.newSlug) router.push(`/editor/${data.newSlug}`);
  }

  async function onSubmit(formData: Post) {
    const content = editor?.getHTML();

    if (!content) {
      toast.error("Please write some content");
      return;
    }

    const data = {
      ...formData,
      id: props.id,
      oldSlug: props.slug,
      newSlug: formData.slug,
      content,
      published: true,
      masterImage: masterImageUrl === "" ? null : masterImageUrl,
    };

    const response = await updatePost(data);
    if (response?.error) toast.error(response.error);
    else toast.success("Post updated successfully");

    if (data.oldSlug !== data.newSlug) router.push(`/editor/${data.newSlug}`);
  }

  async function onDelete() {
    const response = await deletePost(props.slug);
    if (response?.error) toast.error(response.error);
    else {
      toast.success("Post deleted successfully");
      router.push("/editor");
    }
  }

  return (
    <Form {...form}>
      <form id="editor-form" className="flex h-full flex-col gap-y-6">
        <div className="grid grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-1">
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
                      <Textarea
                        rows={3}
                        disabled={isImageWindowOpen}
                        className="resize-none bg-slate-50 selection:bg-orange-500 placeholder:text-gray-400"
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
          <div className="flex w-full flex-col gap-y-3">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.4 }}
                >
                  <FormItem className="flex flex-col gap-y-0.5">
                    <FormLabel className="text-md font-bold">Slug</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isImageWindowOpen}
                        className="bg-slate-50 selection:bg-orange-500 placeholder:text-gray-400"
                        type="slug"
                        placeholder="Post Slug"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.6 }}
              className="flex h-full w-full flex-col"
            >
              <FormLabel className="text-md font-bold">Master Image</FormLabel>
              <div className="flex h-full flex-col gap-2">
                <Button
                  disabled={isImageWindowOpen || form.formState.isSubmitting}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMasterImageSelectorOpen(true);
                    setIsImageWindowOpen(true);
                  }}
                >
                  Upload Master Image
                </Button>
                <Button
                  disabled={isImageWindowOpen || form.formState.isSubmitting}
                  className="cursor-pointer bg-red-600 hover:bg-red-800"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMasterImageUrl("");
                  }}
                >
                  Remove
                </Button>
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.4 }}
              className={cn("relative h-full w-full")}
            >
              <Image
                src={
                  masterImageUrl !== "" ? masterImageUrl : "/image-upload.png"
                }
                alt="Master Image"
                className="h-full w-full object-contain"
                fill
              />
            </motion.div>
          </div>
        </div>
        <motion.div
          className="h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.8 }}
        >
          <FormItem className="w-fulll flex h-full min-h-[300px] flex-col gap-y-1 md:relative">
            <FormControl>
              <div className="flex h-full w-full flex-col md:absolute">
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
        <div className="flex justify-between gap-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.7 }}
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
            className="self-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.7 }}
          >
            <Link href="/editor">
              <Button className="cursor-pointer">All Posts</Button>
            </Link>
          </motion.div>
          <div className="flex flex-col gap-2 md:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.7 }}
            >
              {!form.formState.isSubmitting ? (
                <Button
                  disabled={isImageWindowOpen}
                  form="editor-form"
                  onClick={form.handleSubmit(onSaveDraft)}
                  className="cursor-pointer transition-colors"
                  type="submit"
                  value="update"
                >
                  Save Draft
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
              transition={{ duration: 0.25, delay: 0.7 }}
            >
              {!form.formState.isSubmitting ? (
                <Button
                  disabled={isImageWindowOpen}
                  form="editor-form"
                  onClick={form.handleSubmit(onSubmit)}
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
        </div>
      </form>
    </Form>
  );
}
