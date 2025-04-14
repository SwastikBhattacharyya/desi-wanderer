import { db } from "@/db";
import { post } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditorCard from "./editor-card";

export default async function RichTextEditor({ slug }: { slug: string }) {
  const postData = await db.select().from(post).where(eq(post.slug, slug));
  if (postData.length === 0) notFound();

  const { title, description, content } = postData[0];
  const editorData = {
    slug,
    title,
    description,
    content,
  };

  return <EditorCard {...editorData} />;
}
