import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit out/en/index.html instead of out/en.html so every static host resolves
  // /en/ without extension-less URL guessing.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
