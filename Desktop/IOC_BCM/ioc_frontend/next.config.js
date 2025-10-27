/** @type {import('next').NextConfig} */

const nextConfig = {
  // Add image domains and sizes configuration
  // basePath: "/uatTesting",

  images: {
    // unoptimized: true,
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true, // This will disable image optimization to help with local static files
  },
  experimental: {

  },
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
