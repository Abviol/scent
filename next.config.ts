import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://i.makeup.it/**'), new URL('https://lh3.googleusercontent.com/**')],
  },
};

export default nextConfig;
