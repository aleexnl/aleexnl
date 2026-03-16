import { generateMetadata } from "../../src/app/[locale]/layout";

vi.mock("next/font/google", () => ({
	Roboto: () => ({ variable: "--font-roboto" }),
}));

vi.mock("next-intl/server", () => ({
	getMessages: vi.fn().mockResolvedValue({}),
	getTranslations: vi.fn().mockImplementation(({ namespace }) => {
		const translations: Record<string, Record<string, string>> = {
			meta: {
				title: "Alejandro - Software Developer",
				description: "Test description",
			},
			nav: { skipToContent: "Skip to content" },
		};
		return Promise.resolve(
			(key: string) => translations[namespace]?.[key] ?? "",
		);
	}),
}));

describe("generateMetadata", () => {
	describe("English locale (default)", () => {
		const params = Promise.resolve({ locale: "en" });

		it("sets canonical to the root URL", async () => {
			const metadata = await generateMetadata({ params });

			expect(metadata.alternates?.canonical).toBe("https://aleexnl.com/");
		});

		it("sets x-default hreflang to the root URL", async () => {
			const metadata = await generateMetadata({ params });
			const languages = metadata.alternates?.languages as Record<
				string,
				string
			>;

			expect(languages["x-default"]).toBe("https://aleexnl.com/");
		});

		it("sets en hreflang to the root URL", async () => {
			const metadata = await generateMetadata({ params });
			const languages = metadata.alternates?.languages as Record<
				string,
				string
			>;

			expect(languages.en).toBe("https://aleexnl.com/");
		});

		it("sets OpenGraph url to the root URL", async () => {
			const metadata = await generateMetadata({ params });

			expect(metadata.openGraph?.url).toBe("https://aleexnl.com/");
		});
	});

	describe("Non-default locales", () => {
		it("sets canonical to /ca for Catalan", async () => {
			const params = Promise.resolve({ locale: "ca" });
			const metadata = await generateMetadata({ params });

			expect(metadata.alternates?.canonical).toBe("https://aleexnl.com/ca");
		});

		it("sets canonical to /es for Spanish", async () => {
			const params = Promise.resolve({ locale: "es" });
			const metadata = await generateMetadata({ params });

			expect(metadata.alternates?.canonical).toBe("https://aleexnl.com/es");
		});

		it("sets OpenGraph url to /ca for Catalan", async () => {
			const params = Promise.resolve({ locale: "ca" });
			const metadata = await generateMetadata({ params });

			expect(metadata.openGraph?.url).toBe("https://aleexnl.com/ca");
		});

		it("sets ca and es hreflang to locale-prefixed URLs", async () => {
			const params = Promise.resolve({ locale: "es" });
			const metadata = await generateMetadata({ params });
			const languages = metadata.alternates?.languages as Record<
				string,
				string
			>;

			expect(languages.ca).toBe("https://aleexnl.com/ca");
			expect(languages.es).toBe("https://aleexnl.com/es");
		});
	});
});
