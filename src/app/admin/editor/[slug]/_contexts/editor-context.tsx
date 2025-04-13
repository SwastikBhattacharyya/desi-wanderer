"use client";

import { createContext, useContext, useState } from "react";

type EditorContextType = {
  isImageWindowOpen: boolean;
  imageSelected: string;
  setIsImageWindowOpen: (isOpen: boolean) => void;
  setImageSelected: (url: string) => void;
};

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [isImageWindowOpen, setIsImageWindowOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState("");

  return (
    <EditorContext.Provider
      value={{
        isImageWindowOpen,
        imageSelected,
        setIsImageWindowOpen,
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
