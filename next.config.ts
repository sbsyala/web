import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shakyabajracharyasamajyala.org.np",
      },
      {
        protocol: "http",
        hostname: "shakyabajracharyasamajyala.org.np",
      },
    ],
  },
};

export default nextConfig;
