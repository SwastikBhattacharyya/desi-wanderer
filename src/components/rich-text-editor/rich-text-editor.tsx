"use client";

import { Editor, EditorContent } from "@tiptap/react";

export default function RichTextEditor({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return <EditorContent className="h-[100%] min-h-[300px]" editor={editor} />;
}
