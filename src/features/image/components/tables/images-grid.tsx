import { ImageType } from "../../schemas/image";
import { EditImage } from "../sheets/edit-image";

export function ImagesGrid({ images }: { images: ImageType[] }) {
  if (images.length === 0)
    return (
      <div className="flex h-full w-full items-center-safe justify-center-safe text-lg">
        No Images
      </div>
    );

  return (
    <div className="my-4 grid h-full grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image) => (
        <EditImage key={image.id} image={image} />
      ))}
    </div>
  );
}
