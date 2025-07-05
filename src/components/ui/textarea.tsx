import { cn } from "@/lib/cn";
import { ComponentProps } from "react";
import { InputLabel, InputPlaceholder } from "./input";

type TextAreaProps = ComponentProps<"textarea"> & {
  "data-valid"?: boolean;
};

export function TextArea({ className, placeholder, ...props }: TextAreaProps) {
  return (
    <InputLabel className={cn("inline-block p-0", className)}>
      <textarea
        className="peer w-full p-2 placeholder-transparent outline-none disabled:cursor-not-allowed"
        data-slot="input"
        placeholder={placeholder}
        {...props}
      />
      <InputPlaceholder
        className="top-2 left-2 -translate-y-0 not-peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-1/2"
        data-slot="placeholder"
      >
        {placeholder}
      </InputPlaceholder>
    </InputLabel>
  );
}
