import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  if (pathName.startsWith("/auth/")) {
    const session = getSessionCookie(request);
    if (session) return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/auth/:path*",
};
