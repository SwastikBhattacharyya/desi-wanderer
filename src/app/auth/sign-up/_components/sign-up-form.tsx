"use client";

import { InputContainer } from "@/app/_components/input-container";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input, InputMessage } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUp } from "../actions";
import { signUpSchema } from "../types";

export function SignUpForm() {
  const {
    control,
    formState: { errors, isSubmitting },
    register,
    resetField,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Form
      className="flex flex-col gap-y-4"
      control={control}
      resetField={resetField}
      validatedAction={signUp}
      toastLoadingMessage="Signing Up..."
    >
      <div className="flex flex-col gap-y-1">
        <InputContainer>
          <Input
            {...register("fullName")}
            placeholder="Full Name"
            data-valid={!errors.fullName}
            aria-invalid={!!errors.fullName}
          />
          <InputMessage error={!!errors.fullName}>
            {errors.fullName?.message}
          </InputMessage>
        </InputContainer>
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
        <InputContainer>
          <PasswordInput
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            data-valid={!errors.confirmPassword}
            aria-invalid={!!errors.confirmPassword}
          />
          <InputMessage error={!!errors.confirmPassword}>
            {errors.confirmPassword?.message}
          </InputMessage>
        </InputContainer>
      </div>
      <Button disabled={isSubmitting}>Sign Up</Button>
    </Form>
  );
}
