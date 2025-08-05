export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  banned: boolean | null;
  role: "adminRole" | "userRole" | null;
  actions?: unknown;
};
