import { memo } from "react";
import { View } from "react-native";
import { Text } from "@/components";
import type { ThemedTextStyle, ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

interface FromCourseCardProps {
	courseTitle: string;
}

export const FromCourseCard = memo((props: FromCourseCardProps) => {
	const { courseTitle } = props;

	const { themed } = useAppTheme();

	return (
		<View style={themed($root)}>
			<Text weight="medium" color="dim" style={themed($title)}>
				FROM COURSE
			</Text>

			<View style={themed($card)}>
				<Text weight="medium">{courseTitle}</Text>
			</View>
		</View>
	);
});

const $root: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.md,
});

const $title: ThemedTextStyle = (theme) => ({
	fontFamily: theme.typography.secondary?.medium,
});

const $card: ThemedViewStyle = (theme) => ({
	borderWidth: 1,
	borderColor: theme.colors.border,
	padding: theme.spacing.sm,
	paddingInline: theme.spacing.md,
	borderRadius: theme.roundness,
});
