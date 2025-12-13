import { Stack } from "expo-router";
import { Header } from "@/components";
import { Provider } from "@/components/Provider";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	return (
		<Provider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="index"
					options={{
						headerShown: true,
						header: () => <Header titleTx="loginScreen:title" />,
					}}
				/>
			</Stack>
		</Provider>
	);
}
