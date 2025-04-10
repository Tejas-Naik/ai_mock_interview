import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google user profile pictures
      'firebasestorage.googleapis.com', // Firebase Storage
    ],
  },
};

export default nextConfig;
