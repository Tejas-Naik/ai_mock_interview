/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
