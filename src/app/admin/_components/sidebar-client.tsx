"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function SidebarContainer({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <>
      <div
        className={cn(
          "absolute z-50 h-dvh w-dvw -translate-x-full overflow-y-auto bg-surface transition-[translate] duration-200 sm:static sm:w-[30dvw] sm:max-w-[350px] sm:min-w-[300px] sm:-translate-x-0 xl:min-w-[350px]",
          { "-translate-x-0": isOpen },
        )}
      >
        <Button
          asChild
          className="absolute top-4 right-2 border-transparent sm:hidden"
          variant="secondary"
          icon
          outline
          onClick={() => setIsOpen(false)}
        >
          <IconX />
        </Button>
        {children}
      </div>
    </>
  );
}

export function SidebarOpenButton() {
  const { setIsOpen } = useSidebar();

  return (
    <Button
      asChild
      className="border-transparent sm:hidden"
      variant="secondary"
      icon
      outline
      onClick={() => setIsOpen(true)}
    >
      <IconMenu2 />
    </Button>
  );
}
