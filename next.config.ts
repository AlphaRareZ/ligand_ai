import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // ── API services ──────────────────────────────────────────────
      // More specific paths must be listed BEFORE the generic /api/:path*
      // so they match first and aren't swallowed by the auth catch-all.
      {
        source: "/api/analysis/:path*",
        destination: "https://api.aml2ligand.online/api/analysis/:path*",
      },
      {
        source: "/api/ligand/:path*",
        destination: "https://api.aml2ligand.online/api/ligand/:path*",
      },
      // ── Auth service (catch-all for /api/auth/...) ────────────────
      {
        source: "/api/:path*",
        destination: "https://auth.aml2ligand.online/api/:path*",
      },
    ];
  },
};

export default nextConfig;
