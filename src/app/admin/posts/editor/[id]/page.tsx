import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { post } from "@/db/schema";
import { hasPermissions } from "@/features/auth/server/functions/has-permissions";
import { PostForm } from "@/features/editor/components/forms/post";
import { PostEditor } from "@/features/editor/components/post-editor";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Editor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data?.session) {
    const params = new URLSearchParams({ toastId: "pageRequiresSession" });
    redirect(`/auth/sign-in?${params.toString()}`);
  }

  const { id } = await params;

  const getPostData = unstable_cache(
    async () => {
      return await db.select().from(post).where(eq(post.id, id)).limit(1);
    },
    ["posts", id],
    { tags: ["posts"] },
  );

  let postData;
  try {
    postData = (await getPostData()).at(0);
    if (!postData) throw new Error("Post Data is undefined");
  } catch {
    const params = new URLSearchParams({ toastId: "editorQueryError" });
    redirect(`/admin/posts?${params.toString()}`);
  }

  if (postData.authorId !== data.user.id)
    if (!(await hasPermissions(data.user.id, { post: ["edit:any"] }))) {
      const params = new URLSearchParams({ toastId: "postRequiresPermission" });
      redirect(`/admin/posts?${params.toString()}`);
    }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col gap-y-4 px-1 pb-2">
        <div>
          <Button asChild variant="ghost">
            <Link
              href="/admin/posts"
              className="flex items-center-safe justify-center-safe"
            >
              <ArrowLeft />
              Back to Posts
            </Link>
          </Button>
        </div>
        <PostForm post={postData}>
          <div className="flex-y-1 flex h-full flex-col gap-y-2 overflow-hidden [@media(max-height:720px)]:min-h-[500px]">
            <PostEditor content={postData.content} />
          </div>
          <div className="flex justify-end-safe gap-x-2 py-2">
            <Button className="cursor-pointer" type="submit">
              Save Draft
            </Button>
          </div>
        </PostForm>
      </div>
    </div>
  );
}
