import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable server components by default for better performance
  reactStrictMode: true,
  // Enable image optimization
  images: {
    domains: [], // Add any external image domains here if needed
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
