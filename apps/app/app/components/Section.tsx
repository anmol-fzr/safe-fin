import type { TextProps, ViewProps } from "react-native";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { Text } from "@/components";
import { spacing, type ThemedViewStyle } from "@/theme";

export type SectionProps = ViewProps;
type SectionPreset = "default" | "filled";

export function Section(props: SectionProps) {
	const { children, ...rest } = props;
	return (
		<Animated.View {...rest} style={[styles.sectionRoot, rest.style]}>
			{children}
		</Animated.View>
	);
}

export type SectionTitleProps = TextProps;

type SectionHeaderProps = ViewProps;

Section.Header = (props: SectionHeaderProps) => {
	const { style, ...rest } = props;
	return <View style={[styles.header, style]} {...rest} />;
};

Section.Title = (props: SectionTitleProps) => {
	return <Text preset="heading" size="lg" {...props} />;
};

const $sectionBodyFilled: ThemedViewStyle = (theme) => ({
	backgroundColor: theme.colors.palette.neutral200,
	padding: theme.spacing.md,
	borderRadius: theme.roundness * 1.5,
});

const presetXStyles = {
	default: {},
	filled: $sectionBodyFilled,
} as const;

interface SectionBodyProps extends ViewProps {
	preset?: SectionPreset;
}

Section.Body = (props: SectionBodyProps) => {
	const { style: $styleOverride, preset = "default", ...rest } = props;

	const $styles = presetXStyles[preset];

	return <View style={[$styles, $styleOverride]} {...rest} />;
};

const styles = StyleSheet.create({
	sectionRoot: {
		gap: spacing.md,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
