import type { TextProps, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Text } from "@/components";
import { spacing } from "@/theme";

export type SectionProps = ViewProps;

export function Section(props: SectionProps) {
	const { children, ...rest } = props;
	return (
		<Animated.View {...rest} style={[styles.sectionRoot, rest.style]}>
			{children}
		</Animated.View>
	);
}

export type SectionTitleProps = TextProps;

Section.Title = (props: SectionTitleProps) => {
	return <Text preset="heading" size="lg" {...props} />;
};

const styles = StyleSheet.create({
	sectionRoot: {
		gap: spacing.md,
	},
});
