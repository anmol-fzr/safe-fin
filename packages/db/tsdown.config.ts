import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		schema: "./src/schema/index.ts",
		main: "./src/index.ts",
		db_dev: "./src/db.dev.ts",
		db_prod: "./src/db.prod.ts",
	},
});
