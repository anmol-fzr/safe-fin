import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
	test: {
		globals: true,
		setupFiles: "./test/setup.ts",
		environment: "jsdom",
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@tests": path.resolve(__dirname, "./test"),
			"@faker-js/faker": "@faker-js/faker/locale/en",
		},
	},
});
