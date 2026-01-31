import type { Notifier } from "@safe-fin/ui/hooks";
import { AuthProvider, NotifierProvider } from "@safe-fin/ui/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { StatusBar } from "expo-status-bar";
import { PressablesConfig } from "pressto";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { IconProvider } from "@/context/IconContext";
import { authClient } from "@/modules/auth/utils";
import { ANIMATION, getSpringConfig } from "@/theme";
import { queryClient } from "@/utils/lib/query";
import { useAppTheme } from "@/utils/useAppTheme";
import { Toaster } from "sonner-native";
import { toast } from "sonner-native";

const { damping, stiffness } = getSpringConfig(ANIMATION.spatial.default);

export function Provider({ children }: PropsWithChildren) {
	const {
		theme: { colors },
		actualTheme,
	} = useAppTheme();

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
							<NotifierProvider value={toast}>
								<PressablesConfig
									animationType="spring"
									animationConfig={{ damping, stiffness }}
									config={{ minScale: 0.95, activeOpacity: 0.1 }}
								>
									<IconProvider>{children}</IconProvider>
								</PressablesConfig>
							</NotifierProvider>
						</AuthProvider>
						<Toaster />
					</GestureHandlerRootView>
				</KeyboardProvider>
			</QueryClientProvider>
		</>
	);
}
