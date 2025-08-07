import { db } from "@/db";
import { post, user } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/functions/has-permissions";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { PostsGrid } from "./posts-grid";

export async function PostsTable({ userId }: { userId: string }) {
  const getOwnPosts = unstable_cache(
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
        .where(eq(post.authorId, userId))
        .innerJoin(user, eq(post.authorId, user.id))
        .orderBy(desc(post.createdAt));

      return posts;
    },
    ["posts", "own", userId],
    { tags: ["posts"] },
  );
  const getAllPosts = unstable_cache(
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
    ["posts", "all"],
    { tags: ["posts"] },
  );
  const getPosts = async () => {
    if (await hasPermissions(userId, { post: ["read:own"] }))
      return getOwnPosts();
    else if (await hasPermissions(userId, { post: ["read:any"] }))
      return getAllPosts();
    else return [];
  };

  const posts = await getPosts();

  return <PostsGrid posts={posts} />;
}
