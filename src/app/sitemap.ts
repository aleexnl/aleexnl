import type { MetadataRoute } from "next";

const languages = {
	en: "https://aleexnl.com/",
	es: "https://aleexnl.com/es",
	ca: "https://aleexnl.com/ca",
	"x-default": "https://aleexnl.com/",
};
export default function sitemap(): MetadataRoute.Sitemap {
	return [languages.en, languages.es, languages.ca].map((url) => ({
		url,
		changeFrequency: "monthly",
		priority: 1,
		alternates: { languages },
	}));
}
