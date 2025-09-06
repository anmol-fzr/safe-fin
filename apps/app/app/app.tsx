/* eslint-disable import/first */
if (__DEV__) {
	require("./devtools/ReactotronConfig.ts");
}
import "./utils/gestureHandler";
import { initI18n } from "./i18n";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useInitialRootStore } from "./models";
import { AppNavigator, useNavigationPersistence } from "./navigators";
import * as storage from "./utils/storage";
import { customFontsToLoad } from "./theme";
import { loadDateFnsLocale } from "./utils/formatDate";
import { LoadingScreen } from "@/screens";
import { Provider } from "@/components/Provider";

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
