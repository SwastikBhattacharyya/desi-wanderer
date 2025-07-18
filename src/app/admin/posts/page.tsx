import { Button } from "@/components/ui/button";
import { DialogBody } from "@/components/ui/dialog";
import {
  Dialog,
  DialogHeader,
  DialogMenu,
  DialogTrigger,
} from "@/components/ui/dialog-client";
import { SidebarHeader, SidebarLayout } from "../_components/sidebar";
import { NewPostForm } from "./_components/new-post-form";
import { PostsTable } from "./_components/posts-table";

export default function Posts() {
  return (
    <SidebarLayout page="posts">
      <SidebarHeader page="posts">
        <div className="flex grow justify-end-safe gap-x-2">
          <Button variant="error" className="z-50 w-20 py-1.5">
            Delete
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-20 py-1.5">New</Button>
            </DialogTrigger>
            <DialogMenu className="h-fit w-[500px] px-3">
              <DialogHeader>
                <h3>New Post</h3>
              </DialogHeader>
              <DialogBody className="items-center-safe px-8">
                <NewPostForm />
              </DialogBody>
            </DialogMenu>
          </Dialog>
        </div>
      </SidebarHeader>
      <PostsTable />
    </SidebarLayout>
  );
}
