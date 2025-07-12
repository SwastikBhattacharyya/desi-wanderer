"use client";

import { ValidatedActionResult, withToast } from "@/lib/validation";
import { ComponentProps } from "react";
import {
  Control,
  Path,
  Form as RHFForm,
  UseFormResetField,
} from "react-hook-form";
import z from "zod";

type FormProps<T extends z.ZodTypeAny> = Omit<
  ComponentProps<typeof RHFForm>,
  "control"
> & {
  control: Control<z.infer<T>>;
  validatedAction: (data: z.infer<T>) => Promise<ValidatedActionResult>;
  resetField: UseFormResetField<z.infer<T>>;
  displayToast?: boolean;
};

export function Form<T extends z.ZodTypeAny>({
  validatedAction,
  resetField,
  displayToast = true,
  children,
  onSubmit,
  ...props
}: FormProps<T>) {
  return (
    <RHFForm
      onSubmit={async (form) => {
        const action = validatedAction(form.data);
        if (displayToast) withToast(action);
        action.then((result) => {
          if (result.success) {
            (Object.keys(form.data) as Path<T>[]).forEach((key) =>
              resetField(key),
            );
          }
        });
        onSubmit?.(form);
        await action;
      }}
      {...props}
    >
      {children}
    </RHFForm>
  );
}
