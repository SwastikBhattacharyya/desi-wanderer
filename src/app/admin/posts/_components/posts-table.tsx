import { db } from "@/db";
import { post, user } from "@/db/schema";
import { accessWithControl } from "@/lib/access";
import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { PostType } from "../types";
import { PostsGrid } from "./posts-grid";

export async function getPostsTableData() {
  return await accessWithControl<PostType[]>({
    body: [
      {
        permissions: {
          post: ["read:any"],
        },
        action: async () => {
          "use cache";

          const rows: PostType[] = await db
            .select({
              id: post.id,
              slug: post.slug,
              title: post.title,
              authorName: user.name,
              published: post.published,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt,
            })
            .from(post)
            .innerJoin(user, eq(user.id, post.authorId));

          cacheTag("posts");
          return {
            success: true,
            message: "Posts data received",
            payload: rows,
          };
        },
      },
      {
        permissions: {
          post: ["read:own"],
        },
        action: async (userSession) => {
          "use cache";

          const rows: PostType[] = await db
            .select({
              id: post.id,
              slug: post.slug,
              title: post.title,
              authorName: user.name,
              published: post.published,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt,
            })
            .from(post)
            .where(eq(post.authorId, userSession.id))
            .innerJoin(user, eq(user.id, post.authorId));

          cacheTag(`posts`);
          return {
            success: true,
            message: "Posts data received",
            payload: rows,
          };
        },
      },
    ],
    failureMessage: "Failed to fetch posts",
  });
}

export async function PostsTable() {
  const posts = (await getPostsTableData()).payload;

  return (
    <div className="h-full w-full">
      <PostsGrid posts={posts ?? []} />
    </div>
  );
}
