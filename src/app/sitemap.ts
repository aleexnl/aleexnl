import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://aleexnl.com/en",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://aleexnl.com/ca",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://aleexnl.com/es",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
	];
}
