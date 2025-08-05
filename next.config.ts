import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nhctq60ink5nn8vy.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
