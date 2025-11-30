import type { ViewProps } from "react-native";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components";
import { spacing } from "@/theme";

export type SectionProps = ViewProps & {
	title: string;
};

export function Section(props: SectionProps) {
	const { title, children, ...rest } = props;
	return (
		<View {...rest} style={[styles.sectionRoot, rest.style]}>
			<Text preset="heading" size="lg">
				{title}
			</Text>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	sectionRoot: {
		gap: spacing.md,
	},
});
