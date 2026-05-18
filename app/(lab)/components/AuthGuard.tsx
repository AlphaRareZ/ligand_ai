"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

/**
 * AuthGuard — client-side real auth verification.
 *
 * The middleware's `session` cookie is just a fast UX gate.
 * This component calls the backend /me endpoint via the browser,
 * which automatically includes the real HttpOnly auth cookie for
 * auth.aml2ligand.online. If the session is expired or invalid,
 * we clear the stale session cookie and redirect to /sign-in.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;

    fetch(`${authUrl}/me`, {
      method: "GET",
      // Same-origin request → Next.js rewrites to auth.aml2ligand.online server-side.
      // credentials: "include" is harmless here (same-origin always sends cookies).
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setVerified(true);
        } else {
          // Session expired or invalid — clear stale session cookie and redirect
          Cookies.remove("session");
          router.replace("/sign-in");
        }
      })
      .catch(() => {
        // Network error — allow through (don't block lab on connectivity issues)
        setVerified(true);
      });
  }, [router]);

  if (!verified) {
    // Show nothing while verifying (middleware already did the fast gate)
    return null;
  }

  return <>{children}</>;
}
