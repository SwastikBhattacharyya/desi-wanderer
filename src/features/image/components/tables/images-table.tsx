import { db } from "@/db";
import { image, user } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/functions/has-permissions";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { ImagesGrid } from "./images-grid";

export async function ImagesTable({ userId }: { userId: string }) {
  const getOwnImages = unstable_cache(
    async () => {
      const images = await db
        .select({
          id: image.id,
          title: image.title,
          alt: image.alt,
          url: image.url,
          uploader: user.name,
          createdAt: image.createdAt,
          updatedAt: image.updatedAt,
        })
        .from(image)
        .where(eq(image.uploaderId, userId))
        .innerJoin(user, eq(image.uploaderId, user.id))
        .orderBy(desc(image.createdAt));

      return images;
    },
    ["images", "own", userId],
    { tags: ["images"] },
  );
  const getAllImages = unstable_cache(
    async () => {
      const images = await db
        .select({
          id: image.id,
          title: image.title,
          alt: image.alt,
          url: image.url,
          uploader: user.name,
          createdAt: image.createdAt,
          updatedAt: image.updatedAt,
        })
        .from(image)
        .innerJoin(user, eq(image.uploaderId, user.id))
        .orderBy(desc(image.createdAt));

      return images;
    },
    ["images", "all"],
    { tags: ["images"] },
  );
  const getPosts = async () => {
    if (await hasPermissions(userId, { image: ["read:own"] }))
      return getOwnImages();
    else if (await hasPermissions(userId, { image: ["read:any"] }))
      return getAllImages();
    else return [];
  };

  const images = await getPosts();

  return <ImagesGrid images={images} />;
}
