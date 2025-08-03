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

export type PostPermissions = (typeof postPermissions)[number];

export type AppPermissions = {
  post?: PostPermissions[];
};

const statement = {
  post: postPermissions,
};

export const ac = createAccessControl(statement);

export const adminRole = ac.newRole({
  post: ["create", "read:any", "edit:any", "delete:any"],
});

export const userRole = ac.newRole({
  post: ["create", "read:own", "edit:own", "delete:own"],
});
