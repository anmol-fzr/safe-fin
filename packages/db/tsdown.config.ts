import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		schema: "./src/schema/index.ts",
		main: "./src/index.ts",
		db: "./src/db.ts",
	},
});
