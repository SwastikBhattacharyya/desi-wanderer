"use client";

import { AgGridReact } from "ag-grid-react";
import { createContext, ReactNode, RefObject, useContext, useRef } from "react";

type PostContextType = {
  gridRef: RefObject<AgGridReact | null>;
};
const PostContext = createContext<PostContextType | undefined>(undefined);
export function usePost() {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePost must be used within PostProvider");
  return context;
}

export function PostProvider({ children }: { children: ReactNode }) {
  const gridRef = useRef<AgGridReact | null>(null);

  return (
    <PostContext.Provider value={{ gridRef }}>{children}</PostContext.Provider>
  );
}
