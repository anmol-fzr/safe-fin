import { type Href, useRouter } from "expo-router";
import { ac } from "node_modules/@faker-js/faker/dist/airline-Dz1uGqgJ";
import { PressableScale } from "pressto";
import {
	Image,
	type ImageSourcePropType,
	StyleSheet,
	type TextStyle,
} from "react-native";
import Animated, {
	FadeIn,
	FadeInUp,
	SlideInDown,
} from "react-native-reanimated";
import { Text } from "@/components";
import { type TxKeyPath, translate } from "@/i18n";
import {
	makeSpringy,
	spacing,
	type ThemedStyle,
	type ThemedViewStyle,
} from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

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
		<PressableScale
			onPress={handlePress}
			style={[themed($quickAction), { backgroundColor: action.bg }]}
		>
			<Text
				preset="subheading"
				style={themed($actionTitle)}
				entering={makeSpringy(FadeInUp)}
				tx={action.labelTx}
			/>
			<Animated.Image
				source={action.image}
				entering={makeSpringy(SlideInDown)}
				style={{ position: "absolute", bottom: 0, right: spacing.md }}
			/>
		</PressableScale>
	);
};

const $actionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
	position: "absolute",
	top: spacing.xs,
	left: spacing.md,
});

const $quickAction: ThemedViewStyle = (theme) => ({
	height: 100,
	alignItems: "center",
	marginInline: 4,
	position: "relative",
	justifyContent: "center",
	borderRadius: theme.roundness * 1.2,
});
