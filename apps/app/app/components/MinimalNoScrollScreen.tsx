import { StatusBar } from "expo-status-bar";
import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { $styles, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle";

export const MinimalNoScrollScreen = (props: PropsWithChildren) => {
	const { children } = props;
	const {
		themeContext,
		theme: { colors },
	} = useAppTheme();

	const $containerInsets = useSafeAreaInsetsStyle(["top"]);

	return (
		<View
			style={[
				$styles.container,
				{ backgroundColor: colors.background },
				{ flex: 1, padding: spacing.xs },
				$containerInsets,
			]}
		>
			<StatusBar style={themeContext === "dark" ? "light" : "dark"} />
			{children}
		</View>
	);
};
