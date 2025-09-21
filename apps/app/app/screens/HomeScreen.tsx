import type { ViewStyle } from "react-native";
import { View } from "react-native";
import { Screen, Text } from "@/components";
import { QuickActions } from "@/components/home/QuickAction/QuickActions";
import { spacing, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export function HomeScreen() {
	const { themed } = useAppTheme();
	return (
		<Screen
			preset="fixed"
			contentContainerStyle={{
				paddingHorizontal: spacing.lg,
				paddingTop: spacing.md,
				gap: spacing.xl,
			}}
			safeAreaEdges={["top"]}
		>
			<View style={themed($longCardStyles)}>
				<Text preset="bold" size="xl">
					Make Your Money Work for You
				</Text>
			</View>

			<QuickActions />
		</Screen>
	);
}

const $longCardStyles: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
	backgroundColor: colors.palette.accent300,
	padding: spacing.md,
	borderRadius: spacing.sm,
});
