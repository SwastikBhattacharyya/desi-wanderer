"use client";

import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import {
  ComponentProps,
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "./button";

type DialogTriggerProps = ComponentProps<"button"> & {
  asChild?: boolean;
};

type DialogContextType = {
  dialogRef: RefObject<HTMLDialogElement | null>;
};
const DialogContext = createContext<DialogContextType | undefined>(undefined);
export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialog must be used within DialogProvider");
  return context;
}

export function Dialog({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <DialogContext.Provider value={{ dialogRef }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({
  asChild,
  className,
  openConditionFn = () => true,
  children,
}: DialogTriggerProps & {
  openConditionFn?: () => boolean;
}) {
  const Comp = asChild ? Slot : "button";
  const { dialogRef } = useDialog();

  return (
    <Comp
      className={className}
      onClick={() => openConditionFn() && dialogRef.current?.showModal()}
    >
      {children}
    </Comp>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  const { dialogRef } = useDialog();

  return (
    <div className="relative flex w-full items-center-safe justify-center-safe">
      <Button
        asChild
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-transparent hover:bg-transparent focus-visible:bg-transparent"
        variant="secondary"
        icon
        onClick={() => {
          dialogRef.current?.close();
        }}
      >
        <IconX />
      </Button>
      {children}
    </div>
  );
}

const DialogMenuComponent = ({
  className,
  children,
}: ComponentProps<"dialog">) => {
  const { dialogRef } = useDialog();

  return (
    <>
      {createPortal(
        <dialog
          className={cn(
            "top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 transform gap-y-4 overflow-y-hidden rounded-xl bg-surface p-6 text-on-surface shadow-sm shadow-background/40 select-none open:flex open:flex-col",
            className,
          )}
          ref={dialogRef}
        >
          {children}
        </dialog>,
        document.body,
      )}
    </>
  );
};
export const DialogMenu = dynamic(() => Promise.resolve(DialogMenuComponent), {
  ssr: false,
});

export function DialogNoButton() {
  const { dialogRef } = useDialog();

  return (
    <Button
      className="w-20"
      onClick={async () => {
        dialogRef.current?.close();
      }}
    >
      No
    </Button>
  );
}

export function DialogYesButton({ onClick }: { onClick: () => void }) {
  const { dialogRef } = useDialog();

  return (
    <Button
      className="w-20"
      variant="error"
      onClick={async () => {
        onClick();
        dialogRef.current?.close();
      }}
    >
      Yes
    </Button>
  );
}
