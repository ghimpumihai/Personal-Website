import { NextRequest, NextResponse } from "next/server";
import { validateBasicAuthHeader } from "@/lib/basic-auth";

function isProtectedPath(pathname: string) {
  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

export function middleware(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const result = validateBasicAuthHeader(request.headers.get("authorization"));

  if (!result.ok) {
    return result.response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
