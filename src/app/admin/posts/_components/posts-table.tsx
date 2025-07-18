import { getPostsTableData } from "../actions";
import { PostsGrid } from "./posts-grid";

export async function PostsTable() {
  const posts = await getPostsTableData();
  return (
    <div className="h-full w-full">
      <PostsGrid posts={posts} />
    </div>
  );
}
