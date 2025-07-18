import { db } from "@/db";
import { post, user } from "@/db/schema";
import { actionWithUser } from "@/lib/validation";
import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { PostType } from "../types";
import { PostsGrid } from "./posts-grid";

const getPostsTableData = actionWithUser<undefined, PostType[]>(
  async (userSession) => {
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

    cacheTag(`post-${userSession.id}`);
    return { success: true, message: "Posts data received", payload: rows };
  },
);

export async function PostsTable() {
  const posts = (await getPostsTableData()).payload;

  return (
    <div className="h-full w-full">
      <PostsGrid posts={posts ?? []} />
    </div>
  );
}
