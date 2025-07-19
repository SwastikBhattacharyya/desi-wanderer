import { User } from "better-auth";
import { hasPermission } from "./actions";
import { Permissions } from "./permissions";
import { ActionResult, actionWithUser } from "./validation";

export type AccessWithControlParams<T> = {
  body: {
    permissions: Permissions;
    action: (userSession: User) => Promise<ActionResult<T>>;
  }[];
  failureMessage: string;
};

export function accessWithControl<T>(params: AccessWithControlParams<T>) {
  return actionWithUser<AccessWithControlParams<T>, T>(
    async (userSession, params) => {
      for (const { permissions, action } of params.body) {
        if (await hasPermission(permissions, userSession)) {
          const result = await action(userSession);
          return result;
        }
      }

      return { success: false, message: params.failureMessage };
    },
  )(params);
}
