import { db } from "@/db";
import { post, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await db.select().from(post).where(eq(post.published, true));
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const postData = await db
    .select({
      title: post.title,
      content: post.content,
      masterImage: post.masterImage,
      published: post.published,
      author: user.name,
    })
    .from(post)
    .where(eq(post.slug, slug))
    .innerJoin(user, eq(post.authorId, user.id));

  if (postData.length === 0) notFound();
  if (!postData[0].published) notFound();

  return (
    <div>
      <div className="relative flex h-[60vh] w-full flex-col items-center justify-center gap-y-2 p-4 text-center text-white">
        <div className="absolute z-10 h-full w-full bg-black opacity-50" />
        <Link
          className="absolute top-0 left-0 z-10 m-4 cursor-pointer text-white"
          href="/"
        >
          <ArrowLeft />
        </Link>
        {postData[0].masterImage && (
          <Image
            className="object-cover"
            src={postData[0].masterImage}
            alt={postData[0].title}
            fill
          />
        )}
        <div className="z-10 text-3xl font-bold">{postData[0].title}</div>
        <div className="z-10 text-xl font-bold">
          Written by {postData[0].author}
        </div>
      </div>
      <div className="flex flex-col gap-y-8 p-4 md:p-8 lg:p-16">
        <div dangerouslySetInnerHTML={{ __html: postData[0].content }} />
      </div>
    </div>
  );
}
