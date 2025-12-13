import type { Notifier } from "@safe-fin/ui/hooks";
import { AuthProvider, NotifierProvider } from "@safe-fin/ui/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { StatusBar } from "expo-status-bar";
import { ac } from "node_modules/@faker-js/faker/dist/airline-DF6RqYmq";
import { act, type PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { IconProvider } from "@/context/IconContext";
// import {
// 	initialWindowMetrics,
// 	SafeAreaProvider,
// } from "react-native-safe-area-context";
import { authClient } from "@/modules/auth/utils";
import { useAppTheme } from "@/utils/useAppTheme";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
});

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
	const {
		theme: { colors },
		actualTheme,
	} = useAppTheme();

	console.log({ actualTheme, bg: colors.background });

	return (
		<>
			<StatusBar
				style={actualTheme === "dark" ? "light" : "dark"}
				backgroundColor={colors.background}
			/>
			<QueryClientProvider client={queryClient}>
				<KeyboardProvider>
					<GestureHandlerRootView>
						<AuthProvider client={authClient}>
							<NotifierProvider value={notifier}>
								<IconProvider>{children}</IconProvider>
							</NotifierProvider>
						</AuthProvider>
					</GestureHandlerRootView>
				</KeyboardProvider>
			</QueryClientProvider>
		</>
	);
}
