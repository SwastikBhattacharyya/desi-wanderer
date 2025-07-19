import { db } from "@/db/index";
import { account, session, user, verification } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { resend } from "./email";
import { ac, adminRole, authorRole, userRole } from "./permissions";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.RESEND_MAIL_FROM as string,
        to: user.email,
        subject: "Verify your email",
        html: `Welcome to Desi Wanderer! Please verify your email by clicking the link below:<br /><a href="${url}">Verify Email</a>`,
      });
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification,
    },
  }),
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    nextCookies(),
    admin({
      ac,
      roles: {
        adminRole,
        authorRole,
        userRole,
      },
      defaultRole: "userRole",
    }),
  ],
});
