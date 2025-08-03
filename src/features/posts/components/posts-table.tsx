import { db } from "@/db";
import { post, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { PostsGrid } from "./posts-grid";

export async function PostsTable() {
  const getPosts = unstable_cache(
    async () => {
      const posts = await db
        .select({
          id: post.id,
          title: post.title,
          description: post.description,
          author: user.name,
          published: post.published,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        })
        .from(post)
        .innerJoin(user, eq(post.authorId, user.id))
        .orderBy(desc(post.createdAt));

      return posts;
    },
    ["posts"],
    { tags: ["posts"] },
  );
  const posts = await getPosts();

  return <PostsGrid posts={posts} />;
}
