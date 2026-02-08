import * as Sentry from "@sentry/cloudflare";
import type { Hono } from "hono";
import { envs } from "@/utils/envs";

type AppType = Hono<{
	Bindings: CloudflareBindings;
}>;

export function setupMonitoring(app: AppType) {
	if (envs.isDev) {
		return app;
	}

	return Sentry.withSentry((env: CloudflareBindings) => {
		const { id: versionId } = env.CF_VERSION_METADATA;

		return {
			dsn: envs.SENTRY.DSN,
			release: versionId,
			integrations: [Sentry.consoleIntegration()],
			sendDefaultPii: true,
			sampleRate: 0.5,
		};
	}, app);
}
