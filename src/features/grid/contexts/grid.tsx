"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type GridContextType = {
  selectedRows: string[];
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
};
const GridContext = createContext<GridContextType | undefined>(undefined);
export function useGrid() {
  const context = useContext(GridContext);
  if (!context) throw new Error("useGrid must be used within GridProvider");
  return context;
}

export function GridProvider({ children }: { children: ReactNode }) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <GridContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
      }}
    >
      {children}
    </GridContext.Provider>
  );
}
