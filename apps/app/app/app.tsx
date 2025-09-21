/* eslint-disable import/first */
if (__DEV__) {
	require("./devtools/ReactotronConfig.ts");
}
import "./utils/gestureHandler";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Provider } from "@/components/Provider";
import { LoadingScreen } from "@/screens";
import { initI18n } from "./i18n";
import { useInitialRootStore } from "./models";
import { AppNavigator, useNavigationPersistence } from "./navigators";
import { customFontsToLoad } from "./theme";
import { loadDateFnsLocale } from "./utils/formatDate";
import * as storage from "./utils/storage";

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE";

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
		<Provider>
			<AppNavigator
				linking={linking}
				initialState={initialNavigationState}
				onStateChange={onNavigationStateChange}
			/>
		</Provider>
	);
}
