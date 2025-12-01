import type { TOptions } from "i18next";
import { ArrowLeft2 as ChevronLeft } from "iconsax-react-nativejs";
import { memo } from "react";
import { Pressable } from "react-native";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { type TxKeyPath, translate } from "@/i18n";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "../Text";

type GoBackProps = {
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
};

export const GoBack = memo(({ tx, txOptions, goBackText }: GoBackProps) => {
	const navigate = useSafeNavigation();
	const {
		theme: { colors },
	} = useAppTheme();

	const i18nText = tx && translate(tx, txOptions);

	const content = i18nText || goBackText;

	return (
		<Pressable onPress={navigate.goBack} style={$styles.goBack}>
			<ChevronLeft color={colors.textDim} size={18} />
			<Text>{content}</Text>
		</Pressable>
	);
});
