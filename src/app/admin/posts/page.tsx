import { GridProvider } from "@/features/grid/contexts/grid";
import { DeletePosts } from "@/features/posts/components/delete-posts";
import { NewPost } from "@/features/posts/components/new-post";
import { PostsTable } from "@/features/posts/components/posts-table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Posts() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data?.session) {
    const params = new URLSearchParams({ toastId: "pageRequiresSession" });
    redirect(`/auth/sign-in?${params.toString()}`);
  }

  return (
    <GridProvider>
      <div className="flex h-full flex-col">
        <div className="flex items-center-safe justify-between gap-x-4">
          <h1 className="text-4xl">Posts</h1>
          <div className="flex items-center-safe gap-x-2">
            <DeletePosts />
            <NewPost />
          </div>
        </div>
        <PostsTable userId={data.user.id} />
      </div>
    </GridProvider>
  );
}
