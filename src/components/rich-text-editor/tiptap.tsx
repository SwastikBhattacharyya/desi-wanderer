"use client";

import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";

export default function Tiptap() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "p-4 bg-slate-50 rounded-md outline-none border focus:border-black transition-colors duration-300 h-[100%]",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="flex h-full flex-col">
      <MenuBar editor={editor} />
      <EditorContent className="h-[100%] min-h-[300px]" editor={editor} />
    </div>
  );
}
