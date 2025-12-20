import type { ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Text } from "@/components";
import { spacing } from "@/theme";

export type SectionProps = ViewProps & {
	title: string;
};

export function Section(props: SectionProps) {
	const { title, children, ...rest } = props;
	return (
		<Animated.View {...rest} style={[styles.sectionRoot, rest.style]}>
			<Text preset="heading" size="lg">
				{title}
			</Text>
			{children}
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	sectionRoot: {
		gap: spacing.md,
	},
});
