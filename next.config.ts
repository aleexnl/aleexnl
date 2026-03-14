import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [],
		formats: ["image/avif", "image/webp"],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	headers: async () => [
		{
			source: "/(.*)",
			headers: [
				{ key: "X-Frame-Options", value: "DENY" },
				{ key: "X-Content-Type-Options", value: "nosniff" },
				{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
				{
					key: "Permissions-Policy",
					value: "camera=(), microphone=(), geolocation=()",
				},
				{
					key: "Strict-Transport-Security",
					value: "max-age=63072000; includeSubDomains; preload",
				},
				{ key: "X-DNS-Prefetch-Control", value: "on" },
				{
					key: "Content-Security-Policy",
					value: [
						"default-src 'self'",
						"script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
						"style-src 'self' 'unsafe-inline'",
						"img-src 'self' data:",
						"font-src 'self' https://fonts.gstatic.com",
						"connect-src 'self' https://api.github.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
						"frame-ancestors 'none'",
					].join("; "),
				},
			],
		},
	],
};

export default withNextIntl(nextConfig);
