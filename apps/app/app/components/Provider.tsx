import type { Notifier } from "@safe-fin/ui/hooks";
import { AuthProvider, NotifierProvider } from "@safe-fin/ui/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Burnt from "burnt";
import type { PropsWithChildren } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
	initialWindowMetrics,
	SafeAreaProvider,
} from "react-native-safe-area-context";
import { authClient } from "@/utils/auth";

const queryClient = new QueryClient();

const notifier: Notifier = {
	loading: (msg) =>
		Burnt.toast({
			title: msg,
		}),
	success: (msg) =>
		Burnt.toast({
			title: msg,
			preset: "done",
		}),
	error: (msg) =>
		Burnt.toast({
			title: msg,
			preset: "error",
		}),
};

export function Provider({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<KeyboardProvider>
					<AuthProvider client={authClient}>
						<NotifierProvider value={notifier}>{children}</NotifierProvider>
					</AuthProvider>
				</KeyboardProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
