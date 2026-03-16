import sitemap from "../../src/app/sitemap";

describe("sitemap", () => {
	it("includes the root URL for English instead of /en", () => {
		const entries = sitemap();
		const urls = entries.map((e) => e.url);

		expect(urls).toContain("https://aleexnl.com/");
		expect(urls).not.toContain("https://aleexnl.com/en");
	});

	it("includes /ca and /es locale URLs", () => {
		const entries = sitemap();
		const urls = entries.map((e) => e.url);

		expect(urls).toContain("https://aleexnl.com/ca");
		expect(urls).toContain("https://aleexnl.com/es");
	});

	it("returns 3 entries", () => {
		const entries = sitemap();

		expect(entries).toHaveLength(3);
	});

	it("sets priority 1 and changeFrequency monthly on all entries", () => {
		const entries = sitemap();

		for (const entry of entries) {
			expect(entry.priority).toBe(1);
			expect(entry.changeFrequency).toBe("monthly");
		}
	});
});
