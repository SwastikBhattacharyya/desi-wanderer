"use client";

import TextAlign from "@tiptap/extension-text-align";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { createContext, useContext, useState } from "react";

type EditorContextType = {
  editor: Editor | null;
  isImageSelectorOpen: boolean;
  imageSelected: string;
  setIsImageSelectorOpen: (isOpen: boolean) => void;
  setImageSelected: (url: string) => void;
};

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "p-4 bg-slate-50 rounded-md outline-none border focus:border-black transition-colors duration-300 h-[100%] selection:bg-orange-500 selection:text-white",
      },
    },
    immediatelyRender: false,
  });

  return (
    <EditorContext.Provider
      value={{
        editor,
        isImageSelectorOpen: isImageSelectorOpen,
        imageSelected,
        setIsImageSelectorOpen: setIsImageSelectorOpen,
        setImageSelected,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context)
    throw new Error("useEditorContext must be used within an EditorProvider");
  return context;
};
