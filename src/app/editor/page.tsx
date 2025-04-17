import { db } from "@/db";
import { post, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import * as motion from "motion/react-client";
import { headers } from "next/headers";
import { PostTable } from "./_components/post-table";
import { columns } from "./columns";

export default async function EditorList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const dbRole = await db
    .select()
    .from(user)
    .where(eq(user.id, session!.user.id));

  const role = dbRole[0].role;
  let posts: {
    slug: string;
    title: string;
    dateCreated: Date;
    dateUpdated: Date;
  }[] = [];

  if (role === "admin") {
    posts = await db
      .select({
        slug: post.slug,
        title: post.title,
        dateCreated: post.createdAt,
        dateUpdated: post.updatedAt,
      })
      .from(post);
  } else if (role === "author") {
    posts = await db
      .select({
        slug: post.slug,
        title: post.title,
        dateCreated: post.createdAt,
        dateUpdated: post.updatedAt,
      })
      .from(post)
      .where(eq(post.authorId, session!.user.id));
  }

  const tableData = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    dateCreated: post.dateCreated.toLocaleString(),
    dateUpdated: post.dateUpdated.toLocaleString(),
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen min-w-screen flex-col items-center justify-center px-4"
    >
      <h1 className="text-2xl font-bold md:text-4xl">Editor</h1>
      <PostTable columns={columns} data={tableData} />
    </motion.div>
  );
}
