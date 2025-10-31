import { logger } from "@sentry/react-native";

const ERROR_MESSAGES = {
	API: {
		VALIDATION_FAILED:
			"[API] - API data integrity check failed: schema validation unsuccessful",
	},
} as const;

export { ERROR_MESSAGES, logger };
