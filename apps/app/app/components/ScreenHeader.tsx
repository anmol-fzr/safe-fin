import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { memo } from "react";
import { type TextStyle, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { TxKeyPath } from "@/i18n";
import type { ThemedStyle } from "@/theme";
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

	return (
		<View
			style={{
				elevation: 1,
				marginTop: isInNativeHeader ? top : 0,
				paddingInline: spacing.sm,
				paddingBottom: spacing.sm,
				backgroundColor: colors.background,
				// borderBottomWidth: 0.5,
				// borderBottomColor: "#c9c9c9",
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
