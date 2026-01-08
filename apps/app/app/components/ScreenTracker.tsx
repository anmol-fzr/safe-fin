import { logger } from "@sentry/react-native";
import { useGlobalSearchParams, usePathname } from "expo-router";
import { useEffect } from "react";

export function ScreenTracker() {
	const pathname = usePathname();
	const params = useGlobalSearchParams();

	useEffect(() => {
		logger.trace("Screen Track", { pathname, params });
	}, [pathname, params]);

	return null;
}
