import { cn } from "@/lib/cn";
import { ComponentProps } from "react";

export function DialogBody({ children, className }: ComponentProps<"div">) {
  return (
    <div className={cn("flex h-full overflow-y-auto", className)}>
      {children}
    </div>
  );
}
