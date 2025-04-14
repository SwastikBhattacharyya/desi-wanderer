"use client";

import { Editor } from "@tiptap/react";
import { createContext, useContext, useState } from "react";
import "tiptap-extension-resizable-image/styles.css";

type EditorContextType = {
  editor: Editor | null;
  isImageSelectorOpen: boolean;
  imageSelected: { url: string; alt: string };
  setEditor: (editor: Editor | null) => void;
  setIsImageSelectorOpen: (isOpen: boolean) => void;
  setImageSelected: (image: { url: string; alt: string }) => void;
};

export type ImageAttributes = {
  src: string;
  alt?: string;
  style?: string;
};

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState({ url: "", alt: "" });

  return (
    <EditorContext.Provider
      value={{
        editor,
        isImageSelectorOpen: isImageSelectorOpen,
        imageSelected,
        setEditor,
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
