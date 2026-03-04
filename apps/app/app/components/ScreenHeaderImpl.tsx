import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { memo, PropsWithChildren, useCallback, useMemo, useState } from "react";
import Animated, {
	type AnimatedProps,
	FadeInUp,
	FadeOutDown,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import type { TxKeyPath } from "@/i18n";
import { isUndefined } from "@/pkg/utils";
import { makeSpringy, type ThemedTextStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "./Text";

export interface ScreenHeaderRootProps
	extends NativeStackHeaderProps,
		AnimatedProps<ViewProps> {
	isInNativeHeader?: boolean;
}

const ScreenHeaderRoot = memo((props: ScreenHeaderRootProps) => {
	const { navigation, children, style: $stlyeOverride, ...rest } = props;
	let { isInNativeHeader = true } = props;

	if (isUndefined(navigation)) {
		isInNativeHeader = false;
	}

	const { theme } = useAppTheme();
	const { top } = useSafeAreaInsets();

	const [animationTrigger, setAnimationTrigger] = useState(0);

	useFocusEffect(
		useCallback(() => {
			setAnimationTrigger((prev) => prev + 1);
		}, []),
	);

	const $styles = useMemo(
		() => [
			{
				elevation: 1,
				marginTop: isInNativeHeader ? top : 0,
				paddingInline: theme.spacing.sm,
				paddingBottom: theme.spacing.xs,
				backgroundColor: theme.colors.background,
			},
			$stlyeOverride,
		],
		[isInNativeHeader, theme, $stlyeOverride],
	);

	return (
		<Animated.View
			key={`screen-header-${animationTrigger}`}
			style={$styles}
			{...rest}
		>
			{children}
		</Animated.View>
	);
});

interface ScreenHeaderTitleProps {
	titleTx: TxKeyPath;
}

const ScreenHeaderTitle = (props: ScreenHeaderTitleProps) => {
	const { titleTx } = props;
	const { themed } = useAppTheme();

	return (
		<Text
			key={`title-${titleTx}`}
			preset="heading"
			style={themed($title)}
			tx={titleTx}
			entering={makeSpringy(FadeInUp)}
			exiting={FadeOutDown.duration(50)}
		/>
	);
};

interface ScreenHeaderSubTitleProps {
	subTitleTx: TxKeyPath;
}

const ScreenHeaderSubTitle = (props: ScreenHeaderSubTitleProps) => {
	const { subTitleTx } = props;

	return (
		<Text
			key={`subtitle-${subTitleTx}`}
			tx={subTitleTx}
			size="xs"
			entering={makeSpringy(FadeInUp).delay(20)}
			exiting={FadeOutDown.duration(50)}
		/>
	);
};

const $title: ThemedTextStyle = () => ({
	fontSize: 30,
	marginBottom: -6,
});

export const ScreenHeaderImpl = {
	Root: ScreenHeaderRoot,
	Title: ScreenHeaderTitle,
	SubTitle: ScreenHeaderSubTitle,
};
