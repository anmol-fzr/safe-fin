import { useFonts } from "@expo-google-fonts/space-grotesk";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect, useMemo } from "react";
import { Provider } from "@/components/Provider";
import { ScreenTracker } from "@/components/ScreenTracker";
import { useToggle } from "@/hooks/use-toggle";
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
	const { isOpen: isI18nInitialized, onOpen: onI18nInitialized } = useToggle();

	const [theme, setTheme] = usePersistTheme();

	const themeContextValue = useMemo(
		() => ({
			theme: "light" as ThemeContexts,
			//theme: theme as ThemeContexts,
			setTheme: setTheme as (t: ThemeContexts) => void,
		}),
		[theme, setTheme],
	);

	useEffect(() => {
		initCrashReporting();
		initI18n().then(() => {
			onI18nInitialized();
			SplashScreen.hideAsync();
		});
	}, [onI18nInitialized]);

	if (!isI18nInitialized || (!areFontsLoaded && !fontLoadError)) {
		return <LoadingScreen />;
	}

	return (
		<ThemeProvider value={themeContextValue}>
			<Suspense fallback={<LoadingScreen />}>
				<Provider>
					<ScreenTracker />
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen name="index" />
					</Stack>
				</Provider>
			</Suspense>
		</ThemeProvider>
	);
}
