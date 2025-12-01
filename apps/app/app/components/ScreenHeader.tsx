import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { memo } from "react";
import { type TextStyle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { TxKeyPath } from "@/i18n";
import { colors, spacing, type ThemedStyle } from "@/theme";
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

	const { themed } = useAppTheme();
	const { top } = useSafeAreaInsets();

	return (
		<View
			style={{
				marginTop: isInNativeHeader ? top : 0,
				paddingInline: spacing.sm,
				paddingBottom: spacing.sm,
				//marginBottom: spacing.sm,
				backgroundColor: colors.palette.accent100,
				borderBottomWidth: 0.5,
				borderBottomColor: "#c9c9c9",
			}}
		>
			<Text preset="heading" tx={titleTx} style={themed($title)} />
			<Text tx={tagLineTx} />
		</View>
	);
});

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xxxs,
});
