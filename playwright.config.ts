import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: "http://localhost:3102",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "mobile-chromium",
			use: { ...devices["Pixel 7"] },
		},
	],
	webServer: {
		// Run yarn build first: regression checks exercise production rendering.
		command: "yarn start -p 3102",
		url: "http://localhost:3102",
		reuseExistingServer: false,
		timeout: 60_000,
	},
});
