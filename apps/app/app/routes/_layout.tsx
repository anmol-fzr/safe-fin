import { useFonts } from "@expo-google-fonts/space-grotesk";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect, useState } from "react";
import { Provider } from "@/components/Provider";
import { initI18n } from "@/i18n";
import { LoadingScreen } from "@/screens";
import { customFontsToLoad, type ThemeContexts } from "@/theme";
import { initCrashReporting } from "@/utils/crashReporting";
import { ThemeProvider, usePersistTheme } from "@/utils/useAppTheme";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad);
	const [isI18nInitialized, setIsI18nInitialized] = useState(false);

	const [theme, setTheme] = usePersistTheme();

	useEffect(() => {
		initCrashReporting();
		initI18n().then(() => {
			setIsI18nInitialized(true);

			SplashScreen.hideAsync();
			// setTimeout(() => {
			// 	SplashScreen.setOptions({
			// 		fade: true,
			// 	});
			// }, 500);
		});
	}, []);

	if (!isI18nInitialized || (!areFontsLoaded && !fontLoadError)) {
		return <LoadingScreen />;
	}

	return (
		<ThemeProvider value={{ theme: theme as ThemeContexts, setTheme }}>
			<Suspense>
				<Provider>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="index" />
					</Stack>
				</Provider>
			</Suspense>
		</ThemeProvider>
	);
}
