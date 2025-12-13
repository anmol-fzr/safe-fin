import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import type { TOptions } from "i18next";
import { ArrowLeft2 as ChevronLeft } from "iconsax-react-nativejs";
//import { ChevronLeft } from "lucide-react-native";
import { memo, useMemo } from "react";
import { Pressable, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { type TxKeyPath, translate } from "@/i18n";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "../Text";

interface GoBackProps extends NativeStackHeaderProps {
	/**
	 * Text which is looked up via i18n.
	 */
	tx?: TxKeyPath;
	/**
	 * The text to display if not using `tx` or nested components.
	 */
	goBackText?: string;
	/**
	 * Optional options to pass to i18n. Useful for interpolation
	 * as well as explicitly setting locale or translation fallbacks.
	 */
	txOptions?: TOptions;
	isInNativeHeader?: boolean;
}

export const GoBack = memo((props: GoBackProps) => {
	const { tx, txOptions, goBackText, navigation } = props;
	const navigate = useSafeNavigation();
	const {
		theme: { colors },
		themed,
	} = useAppTheme();

	let { isInNativeHeader = true } = props;

	if (navigation === undefined) {
		isInNativeHeader = false;
	}

	const i18nText = tx && translate(tx, txOptions);

	const content = i18nText || goBackText;

	const { top } = useSafeAreaInsets();

	const styles = useMemo(
		() => [
			$styles.goBack,
			themed($goBackRoot),
			{
				marginTop: isInNativeHeader ? top : 0,
			},
		],
		[isInNativeHeader, themed, top],
	);

	return (
		<Pressable onPress={navigate.goBack} style={styles}>
			<ChevronLeft color={colors.textDim} size={18} />
			<Text>{content}</Text>
		</Pressable>
	);
});

const $goBackRoot: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
	elevation: 1,
	padding: spacing.sm,
	backgroundColor: colors.background,
});
