"use client";

import { InputContainer } from "@/app/_components/input-container";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/dialog-client";
import { Form } from "@/components/ui/form";
import { Input, InputMessage } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createPost } from "../actions";
import { newPostSchema } from "../types";

export function NewPostForm() {
  const { dialogRef } = useDialog();
  const {
    control,
    formState: { errors, isSubmitting },
    register,
    resetField,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: "New Post",
      description: "Post Description",
    },
  });

  return (
    <Form
      className="flex w-full flex-col gap-y-4"
      control={control}
      resetField={resetField}
      validatedAction={(data) => {
        const action = createPost(data);
        action.then((result) => result.success && dialogRef.current?.close());
        return action;
      }}
      toastLoadingMessage="Creating New Post..."
    >
      <div className="flex w-full flex-col gap-y-1">
        <InputContainer>
          <Input
            {...register("title")}
            placeholder="Title"
            data-valid={!errors.title}
            aria-invalid={!!errors.title}
          />
          <InputMessage error={!!errors.title}>
            {errors.title?.message}
          </InputMessage>
        </InputContainer>
        <InputContainer>
          <TextArea
            {...register("description")}
            placeholder="Description"
            data-valid={!errors.description}
            aria-invalid={!!errors.description}
            rows={5}
          />
          <InputMessage error={!!errors.description}>
            {errors.description?.message}
          </InputMessage>
        </InputContainer>
      </div>
      <Button className="self-center-safe px-8" disabled={isSubmitting}>
        Create
      </Button>
    </Form>
  );
}
