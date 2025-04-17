import { db } from "@/db";
import { post } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditorCard from "./editor-card";

export default async function RichTextEditor({ slug }: { slug: string }) {
  const postData = await db.select().from(post).where(eq(post.slug, slug));
  if (postData.length === 0) notFound();

  const { id, title, description, content, masterImage } = postData[0];
  const editorData = {
    id,
    slug,
    title,
    description,
    content,
    masterImage: masterImage || "",
  };

  return <EditorCard {...editorData} />;
}
