import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — protects /lab routes.
 *
 * Checks the backend /me endpoint to validate the session.
 * The backend manages its own HttpOnly auth cookies, so we forward
 * the cookies from the browser to the backend to verify the session.
 */
export async function middleware(request: NextRequest) {
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

  try {
    const meRes = await fetch(`${authUrl}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Forward all browser cookies to the backend so it can
        // validate the HttpOnly session/auth cookie it set.
        Cookie: request.headers.get("cookie") || "",
      },
    });

    if (meRes.ok) {
      // User is authenticated — allow through
      return NextResponse.next();
    }
  } catch {
    // Network error calling the auth service — fall through to redirect
  }

  // Not authenticated → redirect to sign-in
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: "/lab/:path*",
};
