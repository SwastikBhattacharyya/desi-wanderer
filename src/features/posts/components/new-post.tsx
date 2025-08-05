"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { NewPostForm } from "./forms/new-post-form";

export function NewPost() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-20 cursor-pointer" size="lg">
          New
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-full">
          <SheetHeader>
            <SheetTitle>New Post</SheetTitle>
            <SheetDescription>
              Enter the title and description of the post
            </SheetDescription>
          </SheetHeader>
          <div className="p-4 pt-0">
            <NewPostForm setSheetOpen={setOpen} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
