import { Button } from "@/components/ui/button";
import { DialogBody } from "@/components/ui/dialog";
import {
  Dialog,
  DialogHeader,
  DialogMenu,
  DialogTrigger,
} from "@/components/ui/dialog-client";
import { NewPostForm } from "./new-post-form";

export function NewPost() {
  return (
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
  );
}
