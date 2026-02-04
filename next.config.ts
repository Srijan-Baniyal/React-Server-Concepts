import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		qualities: [100],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				port: "",
				pathname:
					"/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**",
			},
		],
	},
	cacheComponents: true,
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
