import { KeyboardProvider } from "react-native-keyboard-controller";
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Provider({ children }) {
	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<KeyboardProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</KeyboardProvider>
		</SafeAreaProvider>
	);
}
