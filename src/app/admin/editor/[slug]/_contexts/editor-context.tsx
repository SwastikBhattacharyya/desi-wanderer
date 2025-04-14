"use client";

import { Editor } from "@tiptap/react";
import { createContext, useContext, useState } from "react";
import "tiptap-extension-resizable-image/styles.css";

type EditorContextType = {
  editor: Editor | null;
  isImageSelectorOpen: boolean;
  imageSelected: { url: string; alt: string };
  isMasterImageSelectorOpen: boolean;
  masterImageUrl: string;
  setEditor: (editor: Editor | null) => void;
  setIsImageSelectorOpen: (isOpen: boolean) => void;
  setImageSelected: (image: { url: string; alt: string }) => void;
  setIsMasterImageSelectorOpen: (isOpen: boolean) => void;
  setMasterImageUrl: (url: string) => void;
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
  const [isMasterImageSelectorOpen, setIsMasterImageSelectorOpen] =
    useState(false);
  const [masterImageUrl, setMasterImageUrl] = useState("");

  return (
    <EditorContext.Provider
      value={{
        editor,
        isImageSelectorOpen: isImageSelectorOpen,
        imageSelected,
        isMasterImageSelectorOpen,
        masterImageUrl,
        setEditor,
        setIsImageSelectorOpen: setIsImageSelectorOpen,
        setImageSelected,
        setIsMasterImageSelectorOpen,
        setMasterImageUrl,
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
