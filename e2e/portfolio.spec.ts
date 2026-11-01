import { expect, test } from "@playwright/test";
import ca from "../messages/ca.json";
import en from "../messages/en.json";
import es from "../messages/es.json";

const locales = [
	{ code: "en", path: "/", messages: en },
	{ code: "es", path: "/es", messages: es },
	{ code: "ca", path: "/ca", messages: ca },
] as const;

for (const { code, path, messages } of locales) {
	test(`${code}: localized content, curated projects and search metadata`, async ({
		page,
	}) => {
		const runtimeErrors: string[] = [];
		page.on("pageerror", (error) => runtimeErrors.push(error.message));
		page.on("console", (message) => {
			if (/hydration|did not match|server rendered HTML/i.test(message.text()))
				runtimeErrors.push(message.text());
		});
		await page.goto(path);
		await expect(page.locator("html")).toHaveAttribute("lang", code);
		await expect(page).toHaveTitle(messages.meta.title);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			"content",
			messages.meta.description,
		);
		await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
		await expect(page.getByRole("heading", { level: 1 })).toContainText(
			"Alejandro Nieto Luque",
		);
		await expect(page.locator("#work .project")).toHaveCount(3);
		for (const name of [
			"Library Management",
			"Android Visual Autoclicker",
			"aleexnl.com",
		]) {
			await expect(
				page.locator("#work").getByRole("heading", { name, exact: true }),
			).toBeVisible();
		}
		await expect(page.locator("#experience")).toContainText("Vueling");
		await expect(page.locator("#experience")).toContainText(
			messages.experience.items[0].responsibilities[0],
		);
		const canonical = `https://aleexnl.com${path}`;
		const canonicalHref = await page
			.locator('link[rel="canonical"]')
			.getAttribute("href");
		expect(new URL(canonicalHref ?? "").href).toBe(new URL(canonical).href);
		for (const language of [...locales, { code: "x-default", path: "/" }]) {
			const alternateHref = await page
				.locator(`link[rel="alternate"][hreflang="${language.code}"]`)
				.getAttribute("href");
			expect(new URL(alternateHref ?? "").href).toBe(
				new URL(`https://aleexnl.com${language.path}`).href,
			);
		}
		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
			"content",
			messages.meta.title,
		);
		await expect(
			page.locator('meta[property="og:image"]').first(),
		).toHaveAttribute("content", /^https:\/\/aleexnl\.com\//);
		const structuredData = JSON.parse(
			(await page
				.locator('script[type="application/ld+json"]')
				.textContent()) ?? "{}",
		) as {
			"@graph": { "@type": string; name?: string; inLanguage?: string }[];
		};
		expect(structuredData["@graph"]).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					"@type": "Person",
					name: "Alejandro Nieto Luque",
				}),
				expect.objectContaining({ "@type": "WebSite", inLanguage: code }),
			]),
		);
		expect(runtimeErrors).toEqual([]);
	});
}

test("language links switch locale and identify the current language", async ({
	page,
}) => {
	await page.goto("/");
	for (const { code, messages } of locales.slice(1)) {
		await page.locator(`.locale-nav a[hreflang="${code}"]`).click();
		await expect(page.locator("html")).toHaveAttribute("lang", code);
		await expect(page).toHaveTitle(messages.meta.title);
		await expect(
			page.locator(`.locale-nav a[hreflang="${code}"]`),
		).toHaveAttribute("aria-current", "true");
	}
	await page.locator('.locale-nav a[hreflang="en"]').click();
	await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("skip link transfers keyboard focus to the main landmark", async ({
	page,
}) => {
	await page.goto("/");
	await page.keyboard.press("Tab");
	await expect(page.locator(".skip-link")).toBeFocused();
	await page.keyboard.press("Enter");
	await expect(page.locator("main#main-content")).toBeFocused();
});

test("mobile navigation supports keyboard Escape and closes after an anchor", async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/");
	const toggle = page.locator(".menu-toggle");
	const navigation = page.locator(".primary-nav");
	await expect(toggle).toHaveAttribute("aria-expanded", "false");
	await expect(navigation).toBeHidden();
	await toggle.click();
	await expect(toggle).toHaveAttribute("aria-expanded", "true");
	await expect(navigation).toBeVisible();
	await expect(navigation.locator('a[href="#work"]')).toBeFocused();
	await page.keyboard.press("Escape");
	await expect(toggle).toHaveAttribute("aria-expanded", "false");
	await expect(toggle).toBeFocused();
	await toggle.click();
	await navigation.locator('a[href="#experience"]').click();
	await expect(toggle).toHaveAttribute("aria-expanded", "false");
	await expect(page).toHaveURL(/#experience$/);
	const top = await page
		.locator("#experience")
		.evaluate((element) => element.getBoundingClientRect().top);
	const headerBottom = await page
		.locator(".site-header")
		.evaluate((element) => element.getBoundingClientRect().bottom);
	expect(top).toBeGreaterThanOrEqual(headerBottom);
});

test("all locales fit narrow phones, tablets and desktop in dark mode", async ({
	page,
}) => {
	await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
	for (const { path, code } of locales) {
		await page.goto(path);
		for (const width of [320, 390, 768, 1440]) {
			await page.setViewportSize({ width, height: 900 });
			const dimensions = await page.evaluate(() => ({
				document: document.documentElement.scrollWidth,
				viewport: document.documentElement.clientWidth,
			}));
			expect(dimensions.document, `${code} at ${width}px`).toBeLessThanOrEqual(
				dimensions.viewport,
			);
			await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		}
	}
});

test("reduced motion disables automatic movement and smooth scrolling", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/");
	const motion = await page.evaluate(() => ({
		scrolling: getComputedStyle(document.documentElement).scrollBehavior,
		animations: document
			.getAnimations()
			.filter((animation) => animation.playState === "running").length,
		transition: getComputedStyle(
			document.querySelector(".hero-actions .button") as HTMLElement,
		).transitionDuration,
	}));
	expect(motion).toEqual({
		scrolling: "auto",
		animations: 0,
		transition: "0s",
	});
	await expect(page.locator(".hero-intro")).toBeVisible();
});

test("core content and project links work without client JavaScript", async ({
	browser,
}) => {
	const context = await browser.newContext({
		javaScriptEnabled: false,
		viewport: { width: 390, height: 844 },
		baseURL: "http://localhost:3102",
	});
	try {
		const page = await context.newPage();
		await page.goto("/es");
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		await expect(page.locator("#work .project")).toHaveCount(3);
		await expect(page.locator("#experience")).toContainText(
			es.experience.items[0].responsibilities[0],
		);
		await expect(
			page.locator(
				'#work a[href="https://github.com/aleexnl/aleexnl-library-management"]',
			),
		).toBeVisible();
		await expect(
			page.locator('a[href="mailto:alex.nieto0027@gmail.com"]').first(),
		).toBeVisible();
		await page.locator('.locale-nav a[hreflang="ca"]').click();
		await expect(page.locator("html")).toHaveAttribute("lang", "ca");
		await page.locator('.locale-nav a[hreflang="en"]').click();
		await expect(page.locator("html")).toHaveAttribute("lang", "en");
	} finally {
		await context.close();
	}
});

test("explicit English sharing image ignores Spanish negotiation and revalidates", async ({
	request,
}) => {
	const response = await request.get("/en/opengraph-image", {
		headers: {
			Cookie: "NEXT_LOCALE=es",
			"Accept-Language": "es-ES,es;q=0.9",
		},
	});
	expect(response.status()).toBe(200);
	expect(response.headers()["content-type"]).toContain("image/png");
	expect(response.headers()["cache-control"]).toContain("public");
	expect(response.headers()["cache-control"]).toContain("must-revalidate");
	const image = await response.body();
	expect([...image.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
	expect(image.readUInt32BE(16)).toBe(1200);
	expect(image.readUInt32BE(20)).toBe(630);
});

test("sitemap exposes the three canonical locales and robots references it", async ({
	request,
}) => {
	const sitemap = await request.get("/sitemap.xml");
	expect(sitemap.status()).toBe(200);
	const xml = await sitemap.text();
	const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
		(match) => new URL(match[1]).href,
	);
	expect(locations.sort()).toEqual(
		locales
			.map(({ path }) => new URL(`https://aleexnl.com${path}`).href)
			.sort(),
	);
	for (const { code } of locales) expect(xml).toContain(`hreflang="${code}"`);
	const robots = await request.get("/robots.txt");
	expect(robots.status()).toBe(200);
	expect(await robots.text()).toContain(
		"Sitemap: https://aleexnl.com/sitemap.xml",
	);
});

for (const { code, path, messages } of locales.filter(
	({ code }) => code !== "en",
)) {
	test(`${code}: missing paths preserve localized recovery`, async ({
		page,
	}) => {
		const response = await page.goto(`${path}/missing-page`);
		expect(response?.status()).toBe(404);
		await expect(
			page.getByRole("heading", { name: messages.notFound.title }),
		).toBeVisible();
		await page.getByRole("link", { name: messages.notFound.backHome }).click();
		await expect(page.locator("html")).toHaveAttribute("lang", code);
	});
}
