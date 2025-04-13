import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { post } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as motion from "motion/react-client";
import { notFound } from "next/navigation";
import EditorForm from "./_components/editor-form";

export async function generateStaticParams() {
  const posts = await db.select().from(post);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await db.select().from(post).where(eq(post.slug, slug));

  if (postData.length === 0) notFound();

  const { title, description, content } = postData[0];

  const editorData = {
    slug,
    title,
    description,
    content,
  };

  return (
    <motion.div
      className="flex min-h-screen min-w-screen p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="w-full">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle className="text-4xl font-bold">Editor</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="h-full">
          <EditorForm {...editorData} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
