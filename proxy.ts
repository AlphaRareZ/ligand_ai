import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy (Next.js 16 convention — replaces middleware.ts) — lightweight UX
 * gate for /lab routes.
 *
 * The real auth cookies are HttpOnly and scoped to auth.aml2ligand.online
 * (a different origin), so this proxy can never forward them to /me in a
 * server-side fetch — the browser will only send those cookies back to that
 * domain, not to the Next.js server.
 *
 * Instead, after a successful login the sign-in page sets a lightweight
 * same-domain `session` cookie on the frontend domain. This proxy checks
 * that cookie as a fast, zero-latency UX gate.
 *
 * Real auth security is enforced in two places:
 *   1. The AuthGuard client component in the lab layout (calls /me via browser,
 *      which correctly includes the real HttpOnly cookie cross-origin)
 *   2. Every backend API call (requires the real HttpOnly auth cookie)
 */
export function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (session === "1") {
    return NextResponse.next();
  }

  // No session cookie → redirect to sign-in
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: "/lab/:path*",
};
