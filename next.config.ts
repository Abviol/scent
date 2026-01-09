import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			new URL("https://i.makeup.it/**"),
			new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://github.com/**"),
		],
	},
};

export default nextConfig;
