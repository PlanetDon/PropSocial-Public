import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PRIVATE_PATHS = ["/dashboard", "/messages", "/grc", "/settings", "/invest"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("ps_access_token")?.value;
  const { pathname } = request.nextUrl;

  const isPrivatePath = PRIVATE_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (isPrivatePath && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/messages/:path*", "/grc/:path*", "/settings/:path*", "/invest/:path*"]
};
