"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PostContextType = {
  selectedRows: string[];
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
};
const PostContext = createContext<PostContextType | undefined>(undefined);
export function usePost() {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePost must be used within PostProvider");
  return context;
}

export function PostProvider({ children }: { children: ReactNode }) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <PostContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
