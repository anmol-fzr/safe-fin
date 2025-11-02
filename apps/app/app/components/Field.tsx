import type { PropsWithChildren } from "react";
import { type TextStyle, View } from "react-native";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text, type TextProps } from "./Text";

export const Field = (props: PropsWithChildren) => {
	const { children } = props;
	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<View style={{ gap: spacing.xxxs, marginBottom: spacing.lg }}>
			{children}
		</View>
	);
};

export interface FieldLabelProps extends TextProps {
	status?: "error" | "disabled";
}

Field.Label = (props: FieldLabelProps) => {
	const { style = {}, status = undefined } = props;
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	const $labelStyles = [status === "error" && { color: colors.error }, style];

	return <Text preset="formLabel" {...props} style={themed($labelStyles)} />;
};

// const $labelStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
// marginBottom: spacing.xs,
// });

Field.Helper = (props: TextProps) => {
	const { themed } = useAppTheme();

	const $helperStyles = [$helperStyle, props?.style];

	return <Text preset="formHelper" style={themed($helperStyles)} {...props} />;
};

Field.Error = (props: TextProps) => {
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	const $helperStyles = [
		$helperStyle,
		{ color: colors.error, fontSize: 14, lineHeight: 21 },
		props?.style,
	];

	return <Text preset="formHelper" style={themed($helperStyles)} {...props} />;
};

const $helperStyle: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginTop: spacing.xs,
});
