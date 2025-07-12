"use client";

import { cn } from "@/lib/cn";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { ComponentProps, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

type PasswordInputProps = ComponentProps<"input"> & {
  "data-valid"?: boolean;
};

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  function RightSlot() {
    return (
      <Button
        className={cn("aspect-square h-full w-auto hover:bg-secondary/50", {
          "bg-secondary/50": isPasswordVisible,
        })}
        variant="none"
        icon
        type="button"
        tabIndex={-1}
        aria-hidden={true}
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? (
          <IconEye className="p-0.5" stroke={2} />
        ) : (
          <IconEyeOff className="p-0.5" stroke={2} />
        )}
      </Button>
    );
  }

  return (
    <Input
      className={cn(
        "focus-within:[&_[data-slot=placeholder]]:-top-[-1px] focus-within:[&_[data-slot=placeholder]]:scale-80 focus-within:[&_[data-slot=placeholder]]:bg-success focus-within:[&_[data-slot=placeholder]]:px-4 focus-within:[&_[data-slot=placeholder]]:not-peer-placeholder-shown:peer-data-[valid=false]:bg-error",
        className,
      )}
      right-slot={RightSlot()}
      role="textbox"
      type={isPasswordVisible ? "text" : "password"}
      {...props}
    />
  );
}
