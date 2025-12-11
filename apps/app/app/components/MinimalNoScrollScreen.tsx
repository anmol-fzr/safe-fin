import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { $styles, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export const MinimalNoScrollScreen = (props: PropsWithChildren) => {
	const { children } = props;
	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<SafeAreaView
			style={[
				$styles.container,
				{ backgroundColor: colors.background },
				{ flex: 1, padding: spacing.xs },
			]}
		>
			{children}
		</SafeAreaView>
	);
};
