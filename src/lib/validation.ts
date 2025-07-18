import toast from "react-hot-toast";
import z from "zod";
import { getUser } from "./actions";

export type ValidatedActionResult<T> = {
  success: boolean;
  message: string;
  payload?: T;
};

type UserType = {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
};

export function validatedAction<
  T extends z.ZodTypeAny,
  S = undefined,
  U = undefined,
>(
  schema: T,
  action: S extends undefined
    ? (data: z.infer<T>) => Promise<ValidatedActionResult<U>>
    : (data: z.infer<T>, params: S) => Promise<ValidatedActionResult<U>>,
) {
  return async (
    ...args: S extends undefined
      ? [data: z.infer<T>]
      : [data: z.infer<T>, params: S]
  ): Promise<ValidatedActionResult<U>> => {
    const [data, optionalParams] = args as [z.infer<T>, S];
    const parseResult = schema.safeParse(data);
    if (!parseResult.success)
      return {
        success: false,
        message: parseResult.error.errors[0].message,
      };
    return await action(data, optionalParams);
  };
}

export function validatedActionWithUser<
  T extends z.ZodTypeAny,
  S = undefined,
  U = undefined,
>(
  schema: T,
  action: S extends undefined
    ? (data: z.infer<T>, user: UserType) => Promise<ValidatedActionResult<U>>
    : (
        data: z.infer<T>,
        user: UserType,
        params: S,
      ) => Promise<ValidatedActionResult<U>>,
) {
  return async (
    ...args: S extends undefined
      ? [data: z.infer<T>]
      : [data: z.infer<T>, params: S]
  ): Promise<ValidatedActionResult<U>> => {
    const [data, optionalParams] = args as [z.infer<T>, S];
    const parseResult = schema.safeParse(data);
    if (!parseResult.success)
      return {
        success: false,
        message: parseResult.error.errors[0].message,
      };

    const user = await getUser();
    if (!user)
      return {
        success: false,
        message: "You must be signed in to perform this action",
      };
    return await action(data, user.user, optionalParams);
  };
}

export function actionWithUser<T = undefined, S = undefined>(
  action: T extends undefined
    ? (user: UserType) => Promise<ValidatedActionResult<S>>
    : (user: UserType, params: T) => Promise<ValidatedActionResult<S>>,
) {
  return async (...args: T extends undefined ? [] : [params: T]) => {
    const [optionalParams] = args as [T];
    const user = await getUser();
    if (!user)
      return {
        success: false,
        message: "You must be signed in to perform this action",
      };
    return await action(user.user, optionalParams);
  };
}

export function withToast<T = undefined>(
  action: Promise<ValidatedActionResult<T>>,
  loadingMessage?: string,
) {
  toast.promise(
    async () => {
      const result = await action;
      if (!result.success) throw new Error(result.message);
      return result;
    },
    {
      loading: loadingMessage ?? "Please wait",
      success: (data: ValidatedActionResult<T>) => data.message,
      error: (data: ValidatedActionResult<T>) => data.message,
    },
  );
}
