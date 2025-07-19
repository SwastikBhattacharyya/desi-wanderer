import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/actions";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  if (pathName.startsWith("/auth/")) {
    const session = await getUser();
    if (session) return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathName.startsWith("/admin")) {
    const session = await getUser();
    if (!session || session?.user.role === "userRole")
      return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*"],
};
