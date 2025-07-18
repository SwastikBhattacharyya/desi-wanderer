"use client";

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
import { useState } from "react";
import { deletePosts } from "../actions";
import { PostType } from "../types";
import { usePost } from "./posts-provider";

export function DeletePosts() {
  const { gridRef } = usePost();
  const [rowsSelected, setRowsSelected] = useState(0);

  return (
    <Dialog>
      <DialogTrigger
        openConditionFn={() => {
          const rows = gridRef.current?.api.getSelectedRows();
          if (!rows) return false;
          if (rows.length > 0) {
            setRowsSelected(rows.length);
            return true;
          } else return false;
        }}
        asChild
      >
        <Button variant="error" className="w-20 py-1.5">
          Delete
        </Button>
      </DialogTrigger>
      <DialogMenu className="h-fit w-[500px] px-3">
        <DialogHeader>
          <h3>Delete Post(s)</h3>
        </DialogHeader>
        <DialogBody className="items-center-safe justify-center-safe px-8">
          Are you sure you want to delete {rowsSelected} post(s)?
        </DialogBody>
        <div className="flex justify-center-safe gap-x-4">
          <DialogNoButton />
          <DialogYesButton
            onClick={() => {
              const posts =
                gridRef.current?.api.getSelectedRows() as PostType[];
              const ids = posts?.map((post) => post.id);
              withToast(deletePosts(ids));
            }}
          />
        </div>
      </DialogMenu>
    </Dialog>
  );
}
