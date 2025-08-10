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
import Image from "next/image";
import { useState } from "react";
import { ImageType } from "../../schemas/image";
import { EditImageForm } from "../forms/edit-image.form";

export function EditImage({ image }: { image: ImageType }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-[300px] w-full cursor-pointer"
        >
          <Image
            className="rounded-md object-cover p-4"
            src={image.url}
            alt={image.alt}
            fill
          />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-full">
          <SheetHeader>
            <SheetTitle>Edit Image Metadata</SheetTitle>
            <SheetDescription>
              Edit the title and alt description of the image
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-y-4 p-4 pt-0">
            <Image
              className="self-center-safe"
              src={image.url}
              alt={image.alt}
              height={400}
              width={400}
            />
            <EditImageForm image={image} setSheetOpen={setOpen} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
