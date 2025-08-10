import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/desi-wanderer-bucket/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
