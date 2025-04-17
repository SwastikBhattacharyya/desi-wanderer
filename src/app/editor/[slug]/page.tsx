import { db } from "@/db";
import { post } from "@/db/schema";
import { Loader2 } from "lucide-react";
import * as motion from "motion/react-client";
import { Suspense } from "react";
import ImageSelector from "./_components/image-selector";
import RichTextEditor from "./_components/rich-text-editor";
import { EditorProvider } from "./_contexts/editor-context";

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

  return (
    <EditorProvider>
      <div className="absolute h-full w-full">
        <Suspense>
          <ImageSelector />
        </Suspense>
      </div>

      <motion.div
        className="relative flex min-h-screen min-w-screen p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Suspense
          fallback={
            <div className="absolute top-0 right-0 flex h-screen w-screen flex-col items-center justify-center gap-y-2 text-center text-3xl font-bold">
              <div>Loading the Editor, Please Wait...</div>
              <Loader2 className="animate-spin" />
            </div>
          }
        >
          <RichTextEditor slug={slug} />
        </Suspense>
      </motion.div>
    </EditorProvider>
  );
}
