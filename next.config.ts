import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vpsbn8jlrqhitnzx.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
