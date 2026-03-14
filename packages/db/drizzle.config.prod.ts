import { defineConfig } from "drizzle-kit";
import { envs } from "./src/envs";

export default defineConfig({
	strict: true,
	out: "./migrations/prod",
	schema: "./src/schema/index.ts",
	dialect: "sqlite",
	driver: "d1-http",
	tablesFilter: ["!_cf_KV"],
	dbCredentials: {
		accountId: envs.CLOUDFLARE.ACCOUNT_ID,
		databaseId: envs.CLOUDFLARE.DATABASE_ID,
		token: envs.CLOUDFLARE.D1_TOKEN,
	},
});
