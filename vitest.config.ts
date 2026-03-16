import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	css: {
		postcss: { plugins: [] },
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
		include: ["test/**/*.{spec,test}.{ts,tsx}"],
		coverage: {
			provider: "v8",
			reportsDirectory: "coverage",
			include: ["src/**/*.{ts,tsx}"],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
