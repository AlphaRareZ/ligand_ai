import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://76.13.15.132:5015/api/:path*', // Proxy to Backend
      },
    ]
  },
};

export default nextConfig;
