import { cn } from "@/lib/cn";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "success" | "error" | "none";
  outline?: boolean;
  icon?: boolean;
};

export function Button({
  asChild = false,
  variant = "primary",
  outline = false,
  icon = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "flex cursor-pointer items-center-safe justify-center-safe gap-x-2 rounded-md lowercase transition-[background_ring_border] duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "border-primary bg-primary text-on-primary hover:bg-primary/85 focus-visible:bg-primary/85 focus-visible:ring-primary/85 focus-visible:ring-offset-background":
            variant === "primary",
          "border-secondary bg-secondary text-on-secondary hover:bg-secondary/85 focus-visible:bg-secondary/85 focus-visible:ring-secondary/85 focus-visible:ring-offset-background":
            variant === "secondary",
          "border-success bg-success text-on-success hover:bg-success/85 focus-visible:bg-success/85 focus-visible:ring-success/85 focus-visible:ring-offset-background":
            variant === "success",
          "border-error bg-error text-on-error hover:bg-error/85 focus-visible:bg-error/85 focus-visible:ring-error/85 focus-visible:ring-offset-background":
            variant === "error",
          "text-on-background hover:text-on-primary focus-visible:text-on-primary":
            outline === true && variant === "primary",
          "border-2 bg-transparent hover:border-transparent focus-visible:border-transparent focus-visible:ring-transparent focus-visible:ring-offset-transparent":
            outline === true,
          "size-8": icon,
          "px-2 py-2": !icon,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
