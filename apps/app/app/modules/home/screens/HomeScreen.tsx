import { QuickActions } from "@home/components";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import { Screen, Text } from "@/components";
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
				gap: spacing.xs,
			}}
			safeAreaEdges={["top", "bottom"]}
		>
			<View style={themed($longCardStyles)}>
				<Text preset="bold" size="xl">
					Make Your Money Work for You
				</Text>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: spacing.md,
					}}
				>
					<Text preset="formLabel" size="xs">
						3 min read
					</Text>
					<View
						style={{ backgroundColor: "black", height: 2, aspectRatio: 1 }}
					/>
					<Text preset="formLabel" size="xs">
						3 min read
					</Text>
				</View>
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
