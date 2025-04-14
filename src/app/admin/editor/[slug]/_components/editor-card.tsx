"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as motion from "motion/react-client";
import { useEffect } from "react";
import { ResizableImage } from "tiptap-extension-resizable-image";
import { useEditorContext } from "../_contexts/editor-context";
import EditorForm from "./editor-form";

type EditorCardProps = {
  slug: string;
  title: string;
  description: string;
  content: string;
  masterImage: string;
};

export default function EditorCard(props: EditorCardProps) {
  const {
    isImageSelectorOpen: isImageWindowOpen,
    setIsImageSelectorOpen: setIsImageWindowOpen,
    setEditor,
  } = useEditorContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ResizableImage,
    ],
    content: props.content,
    editorProps: {
      attributes: {
        class:
          "p-4 bg-slate-50 rounded-md outline-none border focus:border-black transition-colors duration-300 h-full selection:bg-orange-500 selection:text-white overflow-y-scroll",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    setEditor(editor);
  }, [editor, setEditor]);

  const editorFormProps = {
    ...props,
    editor,
    isImageWindowOpen,
    setIsImageWindowOpen,
  };

  return (
    <Card
      className={cn("w-full transition-all duration-300", {
        "blur-sm": isImageWindowOpen,
      })}
    >
      <CardHeader>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardTitle className="text-4xl font-bold">Editor</CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className="h-full">
        <EditorForm {...editorFormProps} />
      </CardContent>
    </Card>
  );
}
