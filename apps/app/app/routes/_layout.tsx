import { useFonts } from "@expo-google-fonts/space-grotesk";
import { ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Provider } from "@/components/Provider";
import { initI18n } from "@/i18n";
import { LoadingScreen } from "@/screens";
import { customFontsToLoad } from "@/theme";
import { initCrashReporting } from "@/utils/crashReporting";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad);
	const [isI18nInitialized, setIsI18nInitialized] = useState(false);

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
		<Provider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
			</Stack>
		</Provider>
	);
}
