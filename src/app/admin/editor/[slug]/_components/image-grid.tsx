import { db } from "@/db";
import { image } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ImageGridView from "./image-grid-view";

export default async function ImageGrid() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) return <></>;

  const images = await db
    .select()
    .from(image)
    .where(eq(image.ownerId, session?.user?.id));

  return <ImageGridView images={images} />;
}
