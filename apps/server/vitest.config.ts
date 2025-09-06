import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import path from "path";

export default defineWorkersConfig({
	test: {
		poolOptions: {
			workers: {
				//wrangler: { configPath: "../../wrangler.jsonc" },
				miniflare: {
					TURSO_DB_URL: "file:./test.db",
					TURSO_DB_AUTH_TOKEN: "test-token",
				},
			},
		},
		globals: true,
		coverage: {
			reporter: ["text", "html"],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
