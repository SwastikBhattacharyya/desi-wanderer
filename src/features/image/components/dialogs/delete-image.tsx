"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteImage } from "../../server/actions/delete-image";

export function DeleteImage({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="cursor-pointer font-bold"
          type="button"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-md">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4">Delete Image</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex max-h-full flex-col overflow-hidden px-4 pt-4 pb-2">
          <DialogDescription>
            Are you sure you want to delete this image? Any posts using this
            image would show the alt description instead.
          </DialogDescription>
        </ScrollArea>
        <DialogFooter className="flex-row justify-end px-6 pb-4">
          <DialogClose asChild>
            <Button className="w-20 cursor-pointer" type="button">
              Close
            </Button>
          </DialogClose>
          <Button
            className="w-20 cursor-pointer"
            variant="destructive"
            type="button"
            disabled={isPending}
            onClick={async () => {
              startTransition(async () => {
                const action = deleteImage(id);
                toast.promise(
                  async () => {
                    const result = await action;
                    if (result.success) return result.message;
                    else throw new Error(result.message);
                  },
                  {
                    loading: "Deleting Image...",
                    success: (message) => message,
                    error: (error: Error) => error.message,
                  },
                );
                const result = await action;
                if (result.success) setOpen(false);
              });
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
