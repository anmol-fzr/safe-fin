import { defineConfig } from "drizzle-kit";
import { envs } from "./src/envs";

export default defineConfig({
	schema: "./src/schema/index.ts",
	out: "./migrations/dev",
	dialect: "sqlite",
	dbCredentials: {
		url: envs.DB.URL,
	},
});
