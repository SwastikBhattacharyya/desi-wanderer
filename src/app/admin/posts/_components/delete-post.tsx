import { Button } from "@/components/ui/button";
import { DialogBody } from "@/components/ui/dialog";
import {
  Dialog,
  DialogHeader,
  DialogMenu,
  DialogNoButton,
  DialogTrigger,
  DialogYesButton,
} from "@/components/ui/dialog-client";
import { withToast } from "@/lib/validation";
import { IconTrash } from "@tabler/icons-react";
import { deletePosts } from "../actions";

export function DeletePost({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-transparent text-error hover:bg-transparent focus-visible:bg-transparent"
          icon
        >
          <IconTrash />
        </Button>
      </DialogTrigger>
      <DialogMenu className="h-fit w-[500px] px-3">
        <DialogHeader>
          <h3>Delete Post(s)</h3>
        </DialogHeader>
        <DialogBody className="items-center-safe justify-center-safe px-8">
          Are you sure you want to delete this post?
        </DialogBody>
        <div className="flex justify-center-safe gap-x-4">
          <DialogNoButton />
          <DialogYesButton onClick={() => withToast(deletePosts([id]))} />
        </div>
      </DialogMenu>
    </Dialog>
  );
}
