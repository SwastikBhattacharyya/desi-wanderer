import { Toast } from "@/components/ui/cookie-toaster";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from ".";

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (pathname.split("/")[1] != "auth") return next(request, _next);

    const authResponse = await auth.api.getSession({
      headers: await headers(),
    });
    if (authResponse != null) {
      const response = NextResponse.redirect(new URL("/", request.url));
      const toastObj: Toast = {
        level: "info",
        message: "You are already signed in, please sign out first",
      };
      response.cookies.set("toast", JSON.stringify(toastObj));
      return response;
    }
    return next(request, _next);
  };
};
