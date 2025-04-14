"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { useEditorContext } from "../_contexts/editor-context";
import EditorForm from "./editor-form";

type EditorCardProps = {
  slug: string;
  title: string;
  description: string;
  content: string;
};

export default function EditorCard(props: EditorCardProps) {
  const {
    editor,
    isImageSelectorOpen: isImageWindowOpen,
    setIsImageSelectorOpen: setIsImageWindowOpen,
  } = useEditorContext();

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
