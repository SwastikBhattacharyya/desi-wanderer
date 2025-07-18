"use client";

import { InputContainer } from "@/app/_components/input-container";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input, InputMessage } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "../actions";
import { signInSchema } from "../types";

export function SignInForm() {
  const {
    control,
    formState: { errors, isSubmitting },
    register,
    resetField,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  return (
    <Form
      className="flex flex-col gap-y-4"
      control={control}
      resetField={resetField}
      validatedAction={async (data) => {
        router.prefetch("/");
        const action = signIn(data);
        action.then((result) => {
          if (result.success) router.push("/");
        });
        return action;
      }}
      toastLoadingMessage="Signing In..."
    >
      <div className="flex flex-col gap-y-1">
        <InputContainer>
          <Input
            {...register("email")}
            placeholder="Email Address"
            data-valid={!errors.email}
            aria-invalid={!!errors.email}
          />
          <InputMessage error={!!errors.email}>
            {errors.email?.message}
          </InputMessage>
        </InputContainer>
        <InputContainer>
          <PasswordInput
            {...register("password")}
            placeholder="Password"
            data-valid={!errors.password}
            aria-invalid={!!errors.password}
          />
          <InputMessage error={!!errors.password}>
            {errors.password?.message}
          </InputMessage>
        </InputContainer>
      </div>
      <Button disabled={isSubmitting}>Sign In</Button>
    </Form>
  );
}
