import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["en", "ca", "es", "nl"],
	defaultLocale: "en",
	localePrefix: "as-needed",
});
