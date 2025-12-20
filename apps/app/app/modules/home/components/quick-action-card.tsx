import { type Href, useRouter } from "expo-router";
import { useId } from "react";
import {
	Image,
	type ImageSourcePropType,
	Pressable as RnPressable,
	StyleSheet,
	type TextStyle,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Text } from "@/components";
import { type TxKeyPath, translate } from "@/i18n";
import { spacing, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const Pressable = Animated.createAnimatedComponent(RnPressable);

export interface QuickActionType {
	labelTx: TxKeyPath;
	image: ImageSourcePropType;
	to: Href;
	bg: `#${string}`;
}

type QuickActionCardProps = QuickActionType;
export const QuickActionCard = (action: QuickActionCardProps) => {
	const { themed } = useAppTheme();
	const router = useRouter();

	function handlePress() {
		router.navigate(action.to);
	}

	return (
		<Pressable
			onPress={handlePress}
			style={[styles.quickAction, { backgroundColor: action.bg }]}
		>
			<Text
				preset="subheading"
				style={themed($actionTitle)}
				entering={FadeInUp}
			>
				{translate(action.labelTx)}
			</Text>
			<Image
				source={action.image}
				style={{ position: "absolute", bottom: 0, right: spacing.md }}
			/>
		</Pressable>
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
