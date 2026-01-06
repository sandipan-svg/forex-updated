// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PREFIX = "/admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_PREFIX)) {
    return NextResponse.next();
  }

  // Only check if a session cookie exists (fast & Edge-safe)
  const hasSessionCookie = request.cookies.has("better-auth.session_token"); // default cookie name

  if (!hasSessionCookie) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If cookie exists, allow access (optimistic)
  // Full role check happens server-side below
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};