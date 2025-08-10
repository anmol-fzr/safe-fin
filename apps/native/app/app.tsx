/* eslint-disable import/first */
if (__DEV__) {
	require("./devtools/ReactotronConfig.ts");
}
import "./utils/gestureHandler";
import { initI18n } from "./i18n";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useInitialRootStore } from "./models";
import { AppNavigator, useNavigationPersistence } from "./navigators";
import * as storage from "./utils/storage";
import { customFontsToLoad } from "./theme";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { loadDateFnsLocale } from "./utils/formatDate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingScreen } from "@/screens";

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";

const queryClient = new QueryClient();

// Web linking configuration
const prefix = Linking.createURL("/");
const config = {
	screens: {
		Login: {
			path: "",
		},
		Welcome: "welcome",
		Quiz: "quiz",
	},
};

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
export function App() {
	const {
		initialNavigationState,
		onNavigationStateChange,
		isRestored: isNavigationStateRestored,
	} = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

	const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad);
	const [isI18nInitialized, setIsI18nInitialized] = useState(false);

	useEffect(() => {
		initI18n()
			.then(() => setIsI18nInitialized(true))
			.then(() => loadDateFnsLocale());
	}, []);

	const { rehydrated } = useInitialRootStore(() => {
		// This runs after the root store has been initialized and rehydrated.

		// If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
		// Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
		setTimeout(SplashScreen.hideAsync, 500);
	});

	if (
		!rehydrated ||
		!isNavigationStateRestored ||
		!isI18nInitialized ||
		(!areFontsLoaded && !fontLoadError)
	) {
		return <LoadingScreen />;
	}

	const linking = {
		prefixes: [prefix],
		config,
	};

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<KeyboardProvider>
				<QueryClientProvider client={queryClient}>
					<AppNavigator
						linking={linking}
						initialState={initialNavigationState}
						onStateChange={onNavigationStateChange}
					/>
				</QueryClientProvider>
			</KeyboardProvider>
		</SafeAreaProvider>
	);
}
