"use client";

import { Root } from "@radix-ui/react-select";
import { ComponentProps, ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Select } from "./select";

type SelectInputType<T extends FieldValues> = ComponentProps<typeof Root> & {
  name: Path<T>;
  control: Control<T>;
  children: ReactNode;
  "data-valid"?: boolean;
};

export function SelectInput<T extends FieldValues>({
  name,
  control,
  children,
  ...props
}: SelectInputType<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          placeholder="Country"
          onValueChange={field.onChange}
          name={field.name}
          value={field.value ?? ""}
          ref={field.ref}
          disabled={field.disabled}
          data-valid={props["data-valid"]}
          {...props}
        >
          {children}
        </Select>
      )}
    />
  );
}
