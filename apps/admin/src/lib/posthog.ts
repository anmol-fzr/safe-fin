import posthog from "posthog-js";
import { envs } from "./envs";

const { KEY, HOST } = envs.POSTHOG;

const posthogClient = posthog.init(KEY, {
	api_host: HOST,
	defaults: "2025-05-24",
});

export { posthogClient };
