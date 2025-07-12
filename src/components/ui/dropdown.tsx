import { cn } from "@/lib/cn";
import {
  Content,
  Group,
  Item,
  Label,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import { ComponentProps } from "react";

export function Dropdown({ children, ...props }: ComponentProps<typeof Root>) {
  return <Root {...props}>{children}</Root>;
}

export function DropdownTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Trigger>) {
  return (
    <Trigger
      className={cn("group cursor-pointer outline-none", className)}
      {...props}
    >
      {children}
    </Trigger>
  );
}

export function DropdownMenu({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Portal>
      <Content
        className={cn(
          "my-1 max-h-56 overflow-y-auto rounded-md bg-surface",
          className,
        )}
        {...props}
      >
        {children}
      </Content>
    </Portal>
  );
}

export function DropdownGroup({
  className,
  children,
  ...props
}: ComponentProps<typeof Group>) {
  return (
    <Group
      className={cn("border-b-on-background/30 not-last:border-b", className)}
      {...props}
    >
      {children}
    </Group>
  );
}

export function DropdownLabel({
  className,
  children,
  ...props
}: ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(
        "px-4 py-1.5 text-xs font-light text-on-background/70 select-none",
        className,
      )}
      {...props}
    >
      {children}
    </Label>
  );
}

export function DropdownMenuItem({
  className,
  children,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn(
        "block cursor-pointer px-6 py-1 transition-[background] duration-100 outline-none select-none hover:bg-secondary/60 focus-visible:bg-secondary/60",
        className,
      )}
      {...props}
    >
      {children}
    </Item>
  );
}
