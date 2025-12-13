import { type Href, Link } from "expo-router";
import {
	Image,
	type ImageSourcePropType,
	StyleSheet,
	type TextStyle,
	View,
} from "react-native";
import { Text } from "@/components";
import { spacing, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export interface QuickActionType {
	label: string;
	image: ImageSourcePropType;
	to: Href;
	bg: `#${string}`;
}

type QuickActionCardProps = QuickActionType;
export const QuickActionCard = (action: QuickActionCardProps) => {
	const { themed } = useAppTheme();

	return (
		<Link
			key={action.label}
			href={action.to}
			asChild
			style={[styles.quickAction, { backgroundColor: action.bg }]}
		>
			<View>
				<Text preset="subheading" style={themed($actionTitle)}>
					{action.label}
				</Text>
				<Image
					source={action.image}
					style={{ position: "absolute", bottom: 0, right: spacing.md }}
				/>
			</View>
		</Link>
	);
};

const styles = StyleSheet.create({
	quickAction: {
		width: "48%",
		aspectRatio: 0.9,
		alignItems: "center",
		position: "relative",
		justifyContent: "center",
		borderRadius: 12,
	},
});

const $actionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
	position: "absolute",
	top: spacing.xs,
	left: spacing.md,
});
