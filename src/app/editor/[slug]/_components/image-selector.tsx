import { db } from "@/db";
import { image } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import ImageSelectorCard from "./image-selector-card";

export default async function ImageSelector() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) return <></>;

  const images = await db
    .select({
      url: image.url,
      alt: image.alt,
    })
    .from(image)
    .where(eq(image.ownerId, session?.user?.id))
    .orderBy(desc(image.createdAt));

  return <ImageSelectorCard images={images} />;
}
