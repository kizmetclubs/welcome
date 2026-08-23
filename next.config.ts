import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Marketing page is static-first; the only dynamic surface is /api/waitlist (added in M2).
};

export default nextConfig;
