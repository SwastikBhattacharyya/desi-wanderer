"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useEditorContext } from "../_contexts/editor-context";

export default function ImageGridView({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const { imageSelected, setImageSelected } = useEditorContext();

  if (images.length === 0)
    return (
      <div className="flex h-full w-full items-center justify-center">
        No images found
      </div>
    );

  return (
    <div className="grid grid-cols-2 items-stretch gap-4 overflow-y-scroll sm:grid-cols-3">
      {images.map((image, index) => (
        <div className="relative" key={index}>
          <Image
            className={cn(
              "during-200 relative h-full w-full rounded-xl object-cover transition-all",
              {
                "animate-pulse duration-1000": image.url === "uploading",
              },
            )}
            onClick={() => {
              if (image.url === "uploading") return;
              if (imageSelected.url === image.url)
                setImageSelected({ url: "", alt: "" });
              else setImageSelected({ url: image.url, alt: image.alt });
            }}
            width={250}
            height={250}
            src={image.url !== "uploading" ? image.url : "/image-upload.png"}
            alt={image.alt}
          />
          <AnimatePresence>
            {imageSelected.url === image.url && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute top-0 flex h-full w-full items-center justify-center rounded-xl border-10 border-orange-500 bg-black/50 p-2 text-center text-xs text-white lg:text-base"
              >
                {image.alt}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
