import { useFonts } from "@expo-google-fonts/space-grotesk";
import { SplashScreen, Stack } from "expo-router";
import { Suspense, useEffect, useState } from "react";
import { useMMKVString } from "react-native-mmkv";
import { Provider } from "@/components/Provider";
import { initI18n } from "@/i18n";
import { LoadingScreen } from "@/screens";
import { customFontsToLoad } from "@/theme";
import { initCrashReporting } from "@/utils/crashReporting";
import { storage } from "@/utils/storage";
import { ThemeProvider, useThemePersister } from "@/utils/useAppTheme";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad);
	const [isI18nInitialized, setIsI18nInitialized] = useState(false);

	const { THEME_KEY } = useThemePersister();
	const [theme, setTheme] = useMMKVString(THEME_KEY, storage);

	useEffect(() => {
		initCrashReporting();
		initI18n().then(() => {
			setIsI18nInitialized(true);
			setTimeout(SplashScreen.hideAsync, 500);
		});
	}, []);

	if (!isI18nInitialized || (!areFontsLoaded && !fontLoadError)) {
		return <LoadingScreen />;
	}

	return (
		<ThemeProvider value={{ theme: theme ?? "system", setTheme }}>
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
