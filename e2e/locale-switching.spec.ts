import { expect, test } from "@playwright/test";

test.describe("Locale switching", () => {
	test("default locale loads at /", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText("Software Developer")).toBeVisible();
		await expect(page).toHaveURL(/\/$/);
	});

	test("switches to Catalan when clicking CA", async ({ page }) => {
		await page.goto("/");

		await page
			.getByRole("navigation", { name: "Language switcher" })
			.getByText("CA")
			.click();

		await expect(page).toHaveURL(/\/ca/);
		await expect(page.getByText("Desenvolupador de Software")).toBeVisible();
	});

	test("switches to Spanish when clicking ES", async ({ page }) => {
		await page.goto("/");

		await page
			.getByRole("navigation", { name: "Language switcher" })
			.getByText("ES")
			.click();

		await expect(page).toHaveURL(/\/es/);
		await expect(page.getByText("Desarrollador de Software")).toBeVisible();
	});

	test("switches back to English from Catalan", async ({ page }) => {
		await page.goto("/ca");

		await expect(page.getByText("Desenvolupador de Software")).toBeVisible();

		await page
			.getByRole("navigation", { name: "Language switcher" })
			.getByText("EN")
			.click();

		await expect(page.getByText("Software Developer")).toBeVisible();
	});

	test("Catalan locale displays translated experience titles", async ({
		page,
	}) => {
		await page.goto("/ca");

		await expect(
			page.getByText("Desenvolupador d'Aplicacions Web"),
		).toBeVisible();
		await expect(page.getByText("Tècnic de Serveis Informàtics")).toBeVisible();
	});

	test("Spanish locale displays translated experience titles", async ({
		page,
	}) => {
		await page.goto("/es");

		await expect(
			page.getByText("Desarrollador de Aplicaciones Web"),
		).toBeVisible();
		await expect(
			page.getByText("Técnico de Servicios Informáticos"),
		).toBeVisible();
	});

	test("Catalan locale displays translated language names", async ({
		page,
	}) => {
		await page.goto("/ca");

		await expect(page.getByText("Espanyol")).toBeVisible();
		await expect(page.getByText("Català")).toBeVisible();
		await expect(page.getByText("Anglès")).toBeVisible();
	});

	test("locale switcher highlights current locale", async ({ page }) => {
		await page.goto("/ca");

		const caLink = page
			.getByRole("navigation", { name: "Language switcher" })
			.getByText("CA");
		await expect(caLink).toHaveAttribute("aria-current", "true");
	});

	test("JSON-LD URL updates per locale", async ({ page }) => {
		await page.goto("/es");

		const jsonLd = await page
			.locator('script[type="application/ld+json"]')
			.textContent();
		const data = JSON.parse(jsonLd as string);
		expect(data.url).toBe("https://aleexnl.com/es");
	});
});
