import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

export function EditPost({ id }: { id: string }) {
  return (
    <Button
      asChild
      className="cursor-pointer hover:bg-transparent hover:text-primary focus-visible:bg-transparent focus-visible:text-primary"
      variant="ghost"
      size="icon"
    >
      <Link href={`/admin/posts/editor/${id}`}>
        <Pencil />
      </Link>
    </Button>
  );
}
