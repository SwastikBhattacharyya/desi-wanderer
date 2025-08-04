import { createAccessControl } from "better-auth/plugins/access";

const postPermissions = [
  "create",
  "read:any",
  "read:own",
  "edit:any",
  "edit:own",
  "delete:own",
  "delete:any",
] as const;
const userPermissions = ["read:any", "ban", "set-role"] as const;

export type PostPermissions = (typeof postPermissions)[number];
export type UserPermissions = (typeof userPermissions)[number];

export type AppPermissions = {
  post?: PostPermissions[];
  user?: UserPermissions[];
};

const statement = {
  post: postPermissions,
  user: userPermissions,
};

export const ac = createAccessControl(statement);

export const adminRole = ac.newRole({
  post: ["create", "read:any", "edit:any", "delete:any"],
  user: ["read:any", "ban", "set-role"],
});

export const userRole = ac.newRole({
  post: ["create", "read:own", "edit:own", "delete:own"],
  user: [],
});
