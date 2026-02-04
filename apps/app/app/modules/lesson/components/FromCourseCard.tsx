import { useAppTheme } from "@/utils/useAppTheme";
import { View } from "react-native";
import { memo } from "react";
import { Text } from "@/components";
import { ThemedTextStyle, ThemedViewStyle } from "@/theme";

interface FromCourseCardProps {
	courseTitle: string;
}

export const FromCourseCard = memo((props: FromCourseCardProps) => {
	const { courseTitle } = props;

	const { themed } = useAppTheme();

	return (
		<View style={themed($root)}>
			<Text weight="medium" style={themed($title)}>
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
	color: theme.colors.textDim,
	fontFamily: theme.typography.secondary?.medium,
});

const $card: ThemedViewStyle = (theme) => ({
	borderWidth: 1,
	borderColor: theme.colors.border,
	padding: theme.spacing.sm,
	paddingInline: theme.spacing.md,
	borderRadius: theme.roundness,
});
