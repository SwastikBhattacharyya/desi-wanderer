import { User } from "better-auth";
import toast from "react-hot-toast";
import z from "zod";
import { getUser } from "./actions";

export type ActionResult<T> = {
  success: boolean;
  message: string;
  payload?: T;
};

export function validatedAction<
  T extends z.ZodTypeAny,
  S = undefined,
  U = undefined,
>(
  schema: T,
  action: S extends undefined
    ? (data: z.infer<T>) => Promise<ActionResult<U>>
    : (data: z.infer<T>, params: S) => Promise<ActionResult<U>>,
) {
  return async (
    ...args: S extends undefined
      ? [data: z.infer<T>]
      : [data: z.infer<T>, params: S]
  ): Promise<ActionResult<U>> => {
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
    ? (data: z.infer<T>, user: User) => Promise<ActionResult<U>>
    : (data: z.infer<T>, user: User, params: S) => Promise<ActionResult<U>>,
) {
  return async (
    ...args: S extends undefined
      ? [data: z.infer<T>]
      : [data: z.infer<T>, params: S]
  ): Promise<ActionResult<U>> => {
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
    ? (user: User) => Promise<ActionResult<S>>
    : (user: User, params: T) => Promise<ActionResult<S>>,
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
  action: Promise<ActionResult<T>>,
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
      success: (data: ActionResult<T>) => data.message,
      error: (data: ActionResult<T>) => data.message,
    },
  );
}
