import { defineConfig } from "drizzle-kit";
import { envs } from "./src/envs";

export default defineConfig({
	strict: true,
	out: "./migrations/dev",
	schema: "./src/schema/index.ts",
	dialect: "sqlite",
	driver: "d1-http",
	tablesFilter: ["!_cf_KV"],
	dbCredentials: {
		url: envs.DB.URL,
	},
});
