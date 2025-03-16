import { Toast } from "@/components/ui/cookie-toaster";
import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from ".";

export const withRole: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (pathname.split("/")[1] != "admin") return next(request, _next);

    const authResponse = await auth.api.getSession({
      headers: await headers(),
    });
    if (!authResponse) {
      const response = NextResponse.redirect(
        new URL("/auth/sign-in", request.url),
      );
      const toastObj: Toast = {
        level: "error",
        message:
          "You are not signed in. You must be signed in to access the admin page",
      };
      response.cookies.set("toast", JSON.stringify(toastObj));
      return response;
    } else {
      const query = await db
        .select({
          role: user.role,
        })
        .from(user)
        .where(eq(user.id, authResponse.user.id));
      const role = query[0].role;
      if (role == "user") {
        const response = NextResponse.redirect(new URL("/", request.url));
        const toastObj: Toast = {
          level: "error",
          message: "You are not permitted to access the admin page",
        };
        response.cookies.set("toast", JSON.stringify(toastObj));
        return response;
      }
    }
    return next(request, _next);
  };
};
