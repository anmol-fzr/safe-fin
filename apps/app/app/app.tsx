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
import { AppNavigator, useNavigationPersistence } from "./navigators";
import { customFontsToLoad } from "./theme";
import { initCrashReporting } from "./utils/crashReporting";
//import { loadDateFnsLocale } from "./utils/formatDate";
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
		initCrashReporting();
		initI18n().then(() => {
			setIsI18nInitialized(true);
			setTimeout(SplashScreen.hideAsync, 500);
		});
		// .then(() => loadDateFnsLocale());
	}, []);

	if (
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
