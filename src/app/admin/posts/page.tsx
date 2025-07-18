import { Suspense } from "react";
import { SidebarHeader, SidebarLayout } from "../_components/sidebar";
import { DeletePosts } from "./_components/delete-posts";
import { NewPost } from "./_components/new-post";
import { PostProvider } from "./_components/posts-provider";
import { PostsTable } from "./_components/posts-table";

export const experimental_ppr = true;

export default function Posts() {
  return (
    <SidebarLayout page="posts">
      <PostProvider>
        <SidebarHeader page="posts">
          <div className="flex grow justify-end-safe gap-x-2">
            <DeletePosts />
            <NewPost />
          </div>
        </SidebarHeader>
        <Suspense
          fallback={
            <div className="flex h-full w-full animate-pulse items-center-safe justify-center-safe gap-x-2 rounded-lg bg-surface/70 text-2xl">
              <p>Loading Data...</p>
              <div className="animate-spin rounded-full border-4 border-secondary border-t-primary p-4" />
            </div>
          }
        >
          <PostsTable />
        </Suspense>
      </PostProvider>
    </SidebarLayout>
  );
}
