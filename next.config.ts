import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("@ironsoftware/ironpdf");
    }
    return config;
  },
  // Enable server components external packages
  experimental: {
    serverComponentsExternalPackages: ["@ironsoftware/ironpdf"],
  },
  /* config options here */
};

export default nextConfig;
