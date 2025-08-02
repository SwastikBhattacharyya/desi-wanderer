"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useId, useState } from "react";

export const InputPassword = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [isVisible, setIsVisible] = useState(false);

  const id = useId();

  return (
    <div className="relative">
      <Input
        id={id}
        type={isVisible ? "text" : "password"}
        className={cn("pe-9", className)}
        {...props}
      />
      <Button
        aria-hidden
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setIsVisible((prevState) => !prevState)}
        className="absolute inset-y-0 end-0 cursor-pointer rounded-s-none text-muted-foreground hover:bg-transparent focus-visible:ring-ring/50"
        tabIndex={-1}
      >
        {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        <span className="sr-only">
          {isVisible ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
};
