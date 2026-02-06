import { defineConfig } from "drizzle-kit";
import { envs } from "./src/envs";

export default defineConfig({
	strict: true,
	out: "./migrations/dev",
	schema: "./src/schema/index.ts",
	dialect: "turso",
	dbCredentials: {
		url: envs.DB.URL,
		authToken: envs.DB.TOKEN,
	},
});
