import { logger } from "@sentry/react-native";

const ERROR_MESSAGES = {
	API: {
		VALIDATION_FAILED: "[API] - API data integrity check failed",
	},
} as const;

const SUCCESS_MESSAGES = {
	API: {
		VALIDATION_SUCCESS: "[API] - API data integrity check passed",
	},
} as const;

// const MESSAGE = {
// 	ERROR_MESSAGES,
// 	SUCCESS_MESSAGES,
// };

export { ERROR_MESSAGES, SUCCESS_MESSAGES, logger };
