import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy (Middleware) — protects /lab routes.
 *
 * 1. If `accessToken` cookie exists → allow through.
 * 2. If only `refreshToken` exists → call the refresh endpoint to
 *    get a new access token, forward the Set-Cookie headers.
 * 3. If neither token is present → redirect to /sign-in.
 */
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // ── 1. Access token present → allow through ────────────────────
  if (accessToken) {
    return NextResponse.next();
  }

  // ── 2. No access token, but refresh token → attempt refresh ────
  if (refreshToken) {
    try {
      const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

      const refreshRes = await fetch(`${authUrl}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Forward the cookies from the incoming request so the
          // backend can read the refreshToken cookie
          Cookie: request.headers.get("cookie") || "",
        },
      });

      if (refreshRes.ok) {
        // The backend responds with Set-Cookie headers containing
        // the new tokens — forward them to the browser.
        const response = NextResponse.next();

        const setCookies = refreshRes.headers.getSetCookie();
        for (const cookie of setCookies) {
          response.headers.append("Set-Cookie", cookie);
        }

        return response;
      }
    } catch {
      // Refresh failed due to network error — fall through to redirect
    }
  }

  // ── 3. No valid tokens → redirect to sign-in ──────────────────
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: "/lab/:path*",
};
