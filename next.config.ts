import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"]
  },

  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true
    };
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com"
      }
    ]
  }
};

export default nextConfig;
