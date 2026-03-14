import { Stack } from "expo-router";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{ headerShown: false, animation: "slide_from_right" }}
		>
			<Stack.Screen name="login" options={{ animation: "slide_from_left" }} />
			<Stack.Screen name="verify" options={{ animation: "slide_from_right" }} />
			<Stack.Screen name="register" />
		</Stack>
	);
}
