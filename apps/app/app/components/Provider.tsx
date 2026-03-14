import { AuthProvider, NotifierProvider } from "@safe-fin/ui/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { useLowPowerMode } from "expo-battery";
import * as Haptics from "expo-haptics";
import { StatusBar } from "expo-status-bar";
import { PressablesConfig } from "pressto";
import type { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
	LayoutAnimationConfig,
	ReducedMotionConfig,
	ReduceMotion,
} from "react-native-reanimated";
import { Toaster, toast } from "sonner-native";
import { IconProvider } from "@/context/IconContext";
import { useDisableAnimations } from "@/hooks/use-disable-animations";
import { authClient } from "@/modules/auth/utils";
import { ANIMATION, getSpringConfig } from "@/theme";
import { queryClient } from "@/utils/lib/query";
import { useAppTheme } from "@/utils/useAppTheme";

const { damping, stiffness } = getSpringConfig(ANIMATION.spatial.default);

export function Provider({ children }: PropsWithChildren) {
	const {
		theme: { colors, spacing },
		actualTheme,
		themeContext,
	} = useAppTheme();
	const { disableAnimations } = useDisableAnimations();

	return (
		<>
			<StatusBar
				style={actualTheme === "dark" ? "light" : "dark"}
				backgroundColor={colors.background}
			/>
			<QueryClientProvider client={queryClient}>
				<ReducedMotionConfig
					mode={disableAnimations ? ReduceMotion.Always : ReduceMotion.System}
				/>
				<LayoutAnimationConfig
					skipExiting={disableAnimations}
					skipEntering={disableAnimations}
				>
					<KeyboardProvider>
						<GestureHandlerRootView>
							<AuthProvider client={authClient}>
								<NotifierProvider value={toast}>
									<PressablesConfig
										animationType="spring"
										animationConfig={{ damping, stiffness }}
										config={{ minScale: 0.95, activeOpacity: 0.1 }}
										globalHandlers={{
											onPress: () => {
												Haptics.selectionAsync();
											},
										}}
									>
										<IconProvider>{children}</IconProvider>
									</PressablesConfig>
								</NotifierProvider>
							</AuthProvider>
							<Toaster
								style={{ borderRadius: 500 }}
								theme={themeContext}
								gap={spacing.xxs}
								richColors
								duration={2_000}
							/>
						</GestureHandlerRootView>
					</KeyboardProvider>
				</LayoutAnimationConfig>
			</QueryClientProvider>
		</>
	);
}
