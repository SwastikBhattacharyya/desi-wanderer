import toast from "react-hot-toast";
import z from "zod";

export type ValidatedActionResult = {
  success: boolean;
  message: string;
};

export function validatedAction<S = undefined>(
  schema: z.ZodTypeAny,
  action: S extends undefined
    ? (data: z.infer<z.infer<typeof schema>>) => Promise<ValidatedActionResult>
    : (
        data: z.infer<z.infer<typeof schema>>,
        params: S,
      ) => Promise<ValidatedActionResult>,
) {
  return async (
    ...args: S extends undefined
      ? [data: z.infer<typeof schema>]
      : [data: z.infer<typeof schema>, params: S]
  ): Promise<ValidatedActionResult> => {
    const [data, optionalParams] = args as [z.infer<typeof schema>, S];
    const parseResult = schema.safeParse(data);
    if (!parseResult.success)
      return {
        success: false,
        message: parseResult.error.errors[0].message,
      };
    return await action(data, optionalParams);
  };
}

export function withToast(action: Promise<ValidatedActionResult>) {
  toast.promise(
    async () => {
      const result = await action;
      if (!result.success) throw new Error(result.message);
      return result;
    },
    {
      loading: "Signing up...",
      success: (data: ValidatedActionResult) => data.message,
      error: (data: ValidatedActionResult) => data.message,
    },
  );
}
