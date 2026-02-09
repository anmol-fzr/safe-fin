import { envs } from "./src/envs";

export default {
	schema: "./src/schema/index.ts",
	out: "./migrations/dev",
	dialect: "sqlite",
	dbCredentials: {
		url: envs.DB.URL,
	},
};
