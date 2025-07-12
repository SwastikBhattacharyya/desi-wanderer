import { cn } from "@/lib/cn";
import {
  Content,
  Group,
  Item,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from "@radix-ui/react-select";
import {
  IconArrowDown,
  IconArrowUp,
  IconChevronDown,
} from "@tabler/icons-react";
import { ComponentProps } from "react";
import { RefCallBack } from "react-hook-form";

type SelectProps = ComponentProps<typeof Root> & {
  ref?: RefCallBack;
  className?: string;
  placeholder: string;
  "data-valid"?: boolean;
};

export function Select({
  ref,
  className,
  placeholder,
  children,
  ...props
}: SelectProps) {
  return (
    <Root {...props}>
      <label
        className={cn(
          "focus-visible:border-foreground relative mt-[9px] inline-flex h-full w-full rounded-md border-2 border-on-background/70 text-left transition-[border] duration-200 ease-in-out outline-none focus-within:border-on-background has-disabled:opacity-50 has-data-[state=open]:border-on-background has-data-[valid=false]:border-error",
          className,
        )}
        aria-label={placeholder}
      >
        <Trigger
          className="group flex w-full cursor-pointer justify-between p-2 outline-none disabled:cursor-not-allowed"
          data-slot="trigger"
          ref={ref}
          data-valid={props["data-valid"]}
          aria-invalid={props["data-valid"] === false}
        >
          <div
            className="pointer-events-none absolute top-1/2 left-2 origin-left -translate-y-1/2 rounded-md text-on-background/70 lowercase transition-[background_transform] duration-200 ease-in-out select-none not-group-data-placeholder:-top-[1px] not-group-data-placeholder:scale-80 not-group-data-placeholder:bg-success not-group-data-placeholder:px-4 not-group-data-placeholder:text-on-success group-focus:-top-[1px] group-focus:scale-80 group-focus:bg-success group-focus:px-4 group-focus:text-on-success group-data-[state=open]:-top-[1px] group-data-[state=open]:scale-80 group-data-[state=open]:bg-success group-data-[state=open]:px-4 group-data-[state=open]:text-on-success group-data-[valid=false]:text-error group-not-data-placeholder:group-data-[valid=false]:bg-error group-not-data-placeholder:group-data-[valid=false]:text-on-error group-focus:group-data-[valid=false]:bg-error group-focus:group-data-[valid=false]:text-on-error group-data-[state=open]:group-data-[valid=false]:bg-error group-data-[state=open]:group-data-[valid=false]:text-on-error"
            data-slot="placeholder"
            aria-hidden
          >
            {placeholder}
          </div>
          <div
            className="text-on-background/70 opacity-0 transition-opacity duration-200 not-group-data-placeholder:text-on-background not-group-data-placeholder:opacity-100 group-data-placeholder:lowercase"
            data-slot="value"
          >
            <Value
              data-slot="value"
              data-valid={props["data-valid"]}
              placeholder={placeholder}
            />
          </div>
          <IconChevronDown
            className="transition-[rotate] duration-200 group-data-[state=open]:rotate-180 group-data-[valid=false]:text-error"
            data-slot="chevron"
          />
        </Trigger>
      </label>
      <Portal>
        <SelectContent>{children}</SelectContent>
      </Portal>
    </Root>
  );
}

function SelectContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Content
      className={cn(
        "max-h-56 w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-md bg-surface",
        className,
      )}
      data-slot="content"
      position="popper"
      sideOffset={6}
      {...props}
    >
      <ScrollUpButton
        className="flex items-center-safe justify-center-safe"
        data-slot="scroll-up"
      >
        <IconArrowUp data-slot="scroll-up-icon" />
      </ScrollUpButton>
      <Viewport data-slot="viewport">{children}</Viewport>

      <ScrollDownButton
        className="flex items-center-safe justify-center-safe"
        data-slot="scroll-down"
      >
        <IconArrowDown data-slot="scroll-down-icon" />
      </ScrollDownButton>
    </Content>
  );
}

export function SelectGroup({
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

export function SelectLabel({
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

export function SelectOption({
  children,
  className,
  ...props
}: ComponentProps<typeof Item>) {
  return (
    <Item
      className={cn(
        "block cursor-pointer px-6 py-1 transition-[background] duration-100 outline-none hover:bg-secondary/60 focus-visible:bg-secondary/60",
        className,
      )}
      {...props}
    >
      <ItemText>{children}</ItemText>
    </Item>
  );
}
