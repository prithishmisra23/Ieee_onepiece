import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Allow unoptimized local images for logos/posters with transparency
    unoptimized: false,
  },
};

export default nextConfig;
