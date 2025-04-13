"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEditorContext } from "../_contexts/editor-context";

export default function ImageGrid({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const { imageSelected, setImageSelected } = useEditorContext();

  return (
    <div className="grid grid-cols-2 gap-4 overflow-y-scroll sm:grid-cols-3">
      {images.map((image, index) => (
        <div
          className={cn(
            "relative h-[20vh] w-full transition-all duration-300",
            {
              "rounded-xl border-10 border-green-500":
                imageSelected === image.url,
            },
          )}
          key={index}
          onClick={() => {
            if (imageSelected === image.url) setImageSelected("");
            else setImageSelected(image.url);
          }}
        >
          <div
            className={cn(
              "absolute top-0 left-0 z-10 h-full w-full bg-transparent transition-colors duration-300",
              {
                "bg-white/30": imageSelected === image.url,
              },
            )}
          ></div>
          <Image
            key={index}
            src={image.url}
            alt={image.alt}
            fill
            className="h-auto w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
