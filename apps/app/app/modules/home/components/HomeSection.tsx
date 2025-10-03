import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components";
import { spacing } from "@/theme";

type HomeSectionProps = PropsWithChildren & {
	title: string;
};

export function HomeSection({ children, title }: HomeSectionProps) {
	return (
		<View style={styles.sectionRoot}>
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
