import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
	test("displays the main heading", async ({ page }) => {
		await page.goto("/");

		await expect(
			page.getByRole("heading", { level: 1, name: "Alejandro Nieto Luque" }),
		).toBeVisible();
	});

	test("displays the tagline", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText("Software Developer")).toBeVisible();
	});

	test("displays all main sections", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText("Experience")).toBeVisible();
		await expect(page.getByText("Education")).toBeVisible();
		await expect(page.getByText("Skills")).toBeVisible();
		await expect(page.getByText("Languages")).toBeVisible();
		await expect(page.getByText("Connect")).toBeVisible();
	});

	test("displays experience items", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText("Fullstack Developer")).toBeVisible();
		await expect(page.getByText("Vueling, Viladecans")).toBeVisible();
		await expect(page.getByText("Web Applications Developer")).toBeVisible();
	});

	test("displays education items", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText(".NET Training")).toBeVisible();
		await expect(page.getByText("Vueling University")).toBeVisible();
	});

	test("displays footer with current year", async ({ page }) => {
		await page.goto("/");

		const currentYear = new Date().getFullYear().toString();
		await expect(
			page.getByText(`© ${currentYear} Alejandro Nieto Luque`),
		).toBeVisible();
	});

	test("has correct page title", async ({ page }) => {
		await page.goto("/");

		await expect(page).toHaveTitle(/Alejandro/);
	});

	test("contains JSON-LD structured data", async ({ page }) => {
		await page.goto("/");

		const jsonLd = await page
			.locator('script[type="application/ld+json"]')
			.textContent();
		expect(jsonLd).toBeTruthy();

		const data = JSON.parse(jsonLd as string);
		expect(data["@type"]).toBe("Person");
		expect(data.name).toBe("Alejandro Nieto Luque");
	});

	test("connect links have correct hrefs", async ({ page }) => {
		await page.goto("/");

		await expect(
			page.locator('a[href="mailto:alex.nieto0027@gmail.com"]'),
		).toBeVisible();
		await expect(
			page.locator(
				'a[href="https://www.linkedin.com/in/alejandro-nieto-luque/"]',
			),
		).toBeVisible();
		await expect(
			page.locator('a[href="https://github.com/aleexnl"]'),
		).toBeVisible();
	});

	test("displays skill items", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText(".NET Development")).toBeVisible();
		await expect(page.getByText("Azure DevOps")).toBeVisible();
	});

	test("displays language items with levels", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByText("Spanish")).toBeVisible();
		await expect(page.getByText("English")).toBeVisible();
		await expect(page.getByText("Fluent")).toBeVisible();
	});
});
