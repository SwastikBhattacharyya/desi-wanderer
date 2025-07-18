import toast from "react-hot-toast";
import z from "zod";
import { getUser } from "./actions";

export type ValidatedActionResult = {
  success: boolean;
  message: string;
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

export function validatedAction<T extends z.ZodTypeAny, S = undefined>(
  schema: T,
  action: S extends undefined
    ? (data: z.infer<T>) => Promise<ValidatedActionResult>
    : (data: z.infer<T>, params: S) => Promise<ValidatedActionResult>,
) {
  return async (
    ...args: S extends undefined
      ? [data: z.infer<T>]
      : [data: z.infer<T>, params: S]
  ): Promise<ValidatedActionResult> => {
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

export function validatedActionWithUser<T extends z.ZodTypeAny, S = undefined>(
  schema: T,
  action: S extends undefined
    ? (data: z.infer<T>, user: UserType) => Promise<ValidatedActionResult>
    : (
        data: z.infer<T>,
        user: UserType,
        params: S,
      ) => Promise<ValidatedActionResult>,
) {
  return async (
    ...args: S extends undefined
      ? [data: z.infer<T>]
      : [data: z.infer<T>, params: S]
  ): Promise<ValidatedActionResult> => {
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

export function withToast(
  action: Promise<ValidatedActionResult>,
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
      success: (data: ValidatedActionResult) => data.message,
      error: (data: ValidatedActionResult) => data.message,
    },
  );
}
