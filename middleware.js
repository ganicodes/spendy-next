import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;
  const isPublicUrl = pathname === "/auth";

  if (isPublicUrl && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicUrl && !token) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
}

export const config = {
  matcher: ["/dashboard", "/ledger", "/auth", "/reports"],
};
