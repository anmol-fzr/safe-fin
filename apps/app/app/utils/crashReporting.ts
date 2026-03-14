import * as Sentry from "@sentry/react-native";
import { envs } from "./envs";

export const initCrashReporting = () => {
	Sentry.init({
		dsn: envs.SENTRY.DSN,
		debug: true,
		enableLogs: true,
		sendDefaultPii: true,
		integrations: [
			Sentry.consoleLoggingIntegration(),
			Sentry.httpClientIntegration(),
			Sentry.feedbackIntegration({
				colorScheme: "system",
				isNameRequired: true,
				isEmailRequired: true,
			}),
		],
	});
};
export enum ErrorType {
	/**
	 * An error that would normally cause a red screen in dev
	 * and force the user to sign out and restart.
	 */
	FATAL = "Fatal",
	/**
	 * An error caught by try/catch where defined using Reactotron.tron.error.
	 */
	HANDLED = "Handled",
}

export const reportCrash = (
	error: Error,
	type: ErrorType = ErrorType.FATAL,
) => {
	if (__DEV__) {
		const message = error.message || "Unknown";
		console.error(error);
		console.log(message, type);
	} else {
		Sentry.captureException(error);
	}
};

export const onLogout = () => {
	Sentry.setUser(null);
};
