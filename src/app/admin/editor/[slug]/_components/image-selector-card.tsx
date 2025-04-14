"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useEditorContext } from "../_contexts/editor-context";
import { deleteImage, uploadImage } from "../actions";
import ImageGridView from "./image-grid-view";

export default function ImageSelectorCard({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const {
    editor,
    isImageSelectorOpen,
    setIsImageSelectorOpen,
    imageSelected,
    setImageSelected,
  } = useEditorContext();
  const altRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [optimisticImages, setOptimsticImages] = useOptimistic(
    images,
    (
      state,
      {
        action,
        image,
      }: {
        action: string;
        image: { url: string; alt: string };
      },
    ) => {
      switch (action) {
        case "add":
          return [image, ...state];
        case "delete":
          return state.filter((img) => img.url !== image.url);
        default:
          return state;
      }
    },
  );
  const [position, setPosition] = useState<string>("");

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsImageSelectorOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isImageSelectorOpen, setIsImageSelectorOpen]);

  async function onUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = event.target.files?.[0];
    const altText = altRef.current?.value;
    altRef.current!.value = "";
    if (!altText) {
      toast.error("Please provide alt text for the image");
      return;
    }
    startTransition(() => {
      setOptimsticImages({
        action: "add",
        image: { url: "uploading", alt: altText },
      });
    });
    const response = await uploadImage(imageFile, altText);
    if (response?.error) toast.error(response.error);
    else toast.success("Image uploaded successfully");
  }

  async function onDeleteImage() {
    setImageSelected({ url: "", alt: "" });
    if (imageSelected.url === "") {
      toast.error("Please select an image to delete");
      return;
    }
    startTransition(() =>
      setOptimsticImages({
        action: "delete",
        image: { url: imageSelected.url, alt: "" },
      }),
    );
    const response = await deleteImage(imageSelected.url);
    if (response?.error) toast.error(response.error);
    else toast.success("Image deleted successfully");
  }

  async function onSubmit() {
    if (imageSelected.url === "") {
      toast.error("Please select an image to insert");
      return;
    }
    if (position === "") {
      toast.error("Please select a position for the image");
      return;
    }

    setIsImageSelectorOpen(false);
    editor
      ?.chain()
      .focus()
      .setResizableImage({
        src: imageSelected.url,
        alt: imageSelected.alt,
        className: `float-${position}`,
      })
      .run();
  }

  return (
    <div
      className={cn("sticky top-0 flex h-screen items-center justify-center", {
        "z-10": isImageSelectorOpen,
      })}
    >
      <AnimatePresence>
        {isImageSelectorOpen && (
          <motion.div
            ref={cardRef}
            className="h-[75vh] w-[90%] lg:w-[60%]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="h-full w-full bg-white shadow-2xl">
              <CardHeader className="flex w-full items-center justify-between">
                <div className="text-2xl font-bold">Select Image</div>
                <div>
                  <X
                    className="cursor-pointer"
                    onClick={() => setIsImageSelectorOpen(false)}
                  />
                </div>
              </CardHeader>
              <CardContent className="h-full overflow-y-scroll py-2">
                <ImageGridView images={optimisticImages} />
              </CardContent>
              <CardFooter className="flex w-full justify-between gap-y-2">
                <div className="flex w-[50%] flex-col gap-2 md:flex-row">
                  <Input ref={altRef} placeholder="Alt Text" />
                  <input
                    className="hidden"
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={onUploadImage}
                  />
                  <label
                    onClick={(e) => {
                      if (altRef.current!.value === "") {
                        e.preventDefault();
                        e.stopPropagation();
                        toast.error("Please provide alt text for the image");
                      }
                    }}
                    htmlFor="image"
                    className="cursor-pointer"
                  >
                    <Button className="pointer-events-none w-full">
                      Upload Image
                    </Button>
                  </label>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                  <Select onValueChange={(value) => setPosition(value)}>
                    <SelectTrigger className="w-[105px]">
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={onDeleteImage}
                    className="cursor-pointer bg-red-700 hover:bg-red-800"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={onSubmit}
                    className="cursor-pointer bg-green-700 hover:bg-green-800"
                  >
                    Submit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
