import { cn } from "@/lib/cn";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { ComponentProps, ReactNode } from "react";

type InputProps = ComponentProps<"input"> & {
  "data-valid"?: boolean;
  "right-slot"?: ReactNode;
};

type InputMessage = ComponentProps<typeof motion.div> & {
  error: boolean;
};

export function InputLabel({
  className,
  children,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "relative mt-[9px] inline-flex cursor-text gap-x-1.5 rounded-md border-2 border-on-background/70 p-2 transition-[border] duration-200 ease-in-out focus-within:border-on-background has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[valid=false]:border-error",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export function InputPlaceholder({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 left-2 origin-left -translate-y-1/2 rounded-md text-on-background/70 lowercase transition-[background_transform] duration-200 ease-in-out select-none not-peer-placeholder-shown:-top-[1px] not-peer-placeholder-shown:scale-80 not-peer-placeholder-shown:bg-success not-peer-placeholder-shown:px-4 not-peer-placeholder-shown:text-on-background peer-focus:-top-[1px] peer-focus:scale-80 peer-focus:bg-success peer-focus:px-4 peer-focus:text-on-background not-peer-placeholder-shown:peer-data-[valid=false]:bg-error peer-placeholder-shown:peer-data-[valid=false]:text-error peer-placeholder-shown:peer-focus:peer-data-[valid=false]:bg-error peer-placeholder-shown:peer-focus:peer-data-[valid=false]:text-on-background",
        className,
      )}
      data-slot="placeholder"
      aria-hidden
      {...props}
    >
      {children}
    </div>
  );
}

function InputRightSlot({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  if (!children) return null;

  return (
    <div
      className={cn("flex items-center-safe justify-center-safe", className)}
      data-slot="right-slot"
      {...props}
    >
      {children}
    </div>
  );
}

export function Input({ className, placeholder, ...props }: InputProps) {
  return (
    <InputLabel className={className} aria-label={placeholder}>
      <input
        className="peer min-w-0 grow placeholder-transparent outline-none disabled:cursor-not-allowed"
        data-slot="input"
        placeholder={placeholder}
        aria-invalid={props["data-valid"] === false}
        {...props}
      />
      <InputPlaceholder>{placeholder}</InputPlaceholder>
      <InputRightSlot>{props["right-slot"]}</InputRightSlot>
    </InputLabel>
  );
}
export function InputMessage({
  error,
  children,
  className,
  ...props
}: InputMessage) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          className={cn(
            "text-sm text-error lowercase peer-data-[state=invalid]:block",
            className,
          )}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
