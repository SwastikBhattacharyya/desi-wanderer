import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    ppr: "incremental",
    reactCompiler: true,
  },
};

export default nextConfig;
