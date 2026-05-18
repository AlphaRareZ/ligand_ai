import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://auth.aml2ligand.online/api/:path*",
      },
    ];
  },
};

export default nextConfig;
