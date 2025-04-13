"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useEditorContext } from "../_contexts/editor-context";
import { deleteImage, uploadImage } from "../actions";

export default function ImageCard({ children }: { children: React.ReactNode }) {
  const {
    isImageWindowOpen,
    setIsImageWindowOpen,
    imageSelected,
    setImageSelected,
  } = useEditorContext();
  const altRef = useRef<HTMLInputElement>(null);
  const [isBusy, setIsBusy] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsImageWindowOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isImageWindowOpen, setIsImageWindowOpen]);

  async function onUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = event.target.files?.[0];
    const altText = altRef.current?.value;
    altRef.current!.value = "";
    if (!altText) {
      toast.error("Please provide alt text for the image");
      return;
    }
    setIsBusy(true);
    const response = await uploadImage(imageFile, altText);
    if (response?.error) toast.error(response.error);
    else toast.success("Image uploaded successfully");
    setIsBusy(false);
  }

  async function onDeleteImage() {
    if (imageSelected === "") {
      toast.error("Please select an image to delete");
      return;
    }
    setIsBusy(true);
    const response = await deleteImage(imageSelected);
    if (response?.error) toast.error(response.error);
    else toast.success("Image deleted successfully");
    setImageSelected("");
    setIsBusy(false);
  }

  return (
    <>
      <AnimatePresence>
        {isImageWindowOpen && (
          <motion.div
            ref={cardRef}
            className="absolute top-1/2 left-1/2 z-10 h-[75%] w-[90%] translate-x-[-50%] translate-y-[-50%] lg:w-[50%]"
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
                    onClick={() => setIsImageWindowOpen(false)}
                  />
                </div>
              </CardHeader>
              <CardContent className="h-full overflow-y-scroll py-2">
                {children}
              </CardContent>
              <CardFooter className="flex w-full justify-between gap-y-2">
                <div className="flex w-[50%] flex-col gap-2 sm:flex-row">
                  <Input
                    disabled={isBusy}
                    ref={altRef}
                    placeholder="Alt Text"
                  />
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
                    <Button
                      className="pointer-events-none w-full"
                      disabled={isBusy}
                    >
                      Upload Image
                    </Button>
                  </label>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    disabled={isBusy}
                    onClick={onDeleteImage}
                    className="cursor-pointer bg-red-700 hover:bg-red-800"
                  >
                    Delete
                  </Button>
                  <Button
                    disabled={isBusy}
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
    </>
  );
}
