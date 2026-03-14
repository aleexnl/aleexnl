import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://aleexnl.vercel.app/en",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: "https://aleexnl.vercel.app/ca",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: "https://aleexnl.vercel.app/es",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
	];
}
