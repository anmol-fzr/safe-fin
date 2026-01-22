import { memo } from "react";
import { type TextStyle, View, type ViewStyle } from "react-native";
import { Text } from "@/components";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export const CourseCompleteBadge = memo(() => {
	const { themed } = useAppTheme();

	return (
		<View style={themed($root)}>
			<Text style={themed($text)} size="xxs" weight="bold">
				COMPLETED
			</Text>
		</View>
	);
});

const $root: ThemedStyle<ViewStyle> = (theme) => ({
	backgroundColor: theme.colors.successBackground,
	width: "auto",
	borderRadius: 50,
	paddingInline: theme.spacing.xs,
	paddingBlock: theme.spacing.xxxs,
});

const $text: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.success,
});
