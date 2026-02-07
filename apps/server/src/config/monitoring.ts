import * as Sentry from "@sentry/cloudflare";
import type { Hono } from "hono";
import { env } from "cloudflare:workers";

const isDev = env.MODE === "DEV";

type AppType = Hono<{
	Bindings: CloudflareBindings;
}>;

export function setupMonitoring(app: AppType) {
	if (isDev) {
		return app;
	}

	return Sentry.withSentry((env: CloudflareBindings) => {
		const { id: versionId } = env.CF_VERSION_METADATA;

		return {
			dsn: env.SENTRY_DSN,
			release: versionId,
			integrations: [Sentry.consoleIntegration()],
			sendDefaultPii: true,
			sampleRate: 0.5,
		};
	}, app);
}
