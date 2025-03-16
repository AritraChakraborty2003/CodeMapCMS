import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "png.pngtree.com",
      "codemap.online",
      "www.pngplay.com",
    ], // Add allowed domains here
  },
};

export default nextConfig;
