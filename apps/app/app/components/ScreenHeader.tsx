import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { memo, useCallback, useState } from "react"; // Import useState and useCallback
import type { TextStyle } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { TxKeyPath } from "@/i18n";
import { makeSpringy, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "./Text";

interface ScreenHeaderProps extends NativeStackHeaderProps {
	titleTx: TxKeyPath;
	tagLineTx: TxKeyPath;
	isInNativeHeader?: boolean;
}

export const ScreenHeader = memo((props: ScreenHeaderProps) => {
	const { titleTx, tagLineTx, navigation } = props;
	let { isInNativeHeader = true } = props;

	if (navigation === undefined) {
		isInNativeHeader = false;
	}

	const {
		themed,
		theme: { colors, spacing },
	} = useAppTheme();
	const { top } = useSafeAreaInsets();

	const [animationTrigger, setAnimationTrigger] = useState(0);

	useFocusEffect(
		useCallback(() => {
			setAnimationTrigger((prev) => prev + 1);
		}, []),
	);

	return (
		<Animated.View
			key={`${titleTx}-${animationTrigger}`}
			style={{
				elevation: 1,
				marginTop: isInNativeHeader ? top : 0,
				paddingInline: spacing.sm,
				paddingBottom: spacing.xs,
				backgroundColor: colors.background,
			}}
		>
			<Text
				key={`title-${titleTx}`}
				preset="heading"
				style={themed($title)}
				tx={titleTx}
				entering={makeSpringy(FadeInUp)}
				exiting={FadeOutDown.duration(50)}
			/>
			<Text
				key={`tag-${tagLineTx}`}
				tx={tagLineTx}
				size="xs"
				entering={makeSpringy(FadeInUp).delay(20)}
				exiting={FadeOutDown.duration(50)}
			/>
		</Animated.View>
	);
});

const $title: ThemedStyle<TextStyle> = () => ({
	fontSize: 30,
	//marginBottom: spacing.xxxs,
});
