import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		app: "./src/app/index.ts",
		server: "./src/server/index.ts",
	},
});
