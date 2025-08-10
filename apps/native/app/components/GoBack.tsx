import { memo } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { type TxKeyPath, translate } from "@/i18n";
import type { TOptions } from "i18next";

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
	const navigate = useNavigation();
	const { theme } = useAppTheme();

	const i18nText = tx && translate(tx, txOptions);

	const content = i18nText || goBackText;

	return (
		<Pressable onPress={navigate.goBack} style={$styles.goBack}>
			<Icon icon="back" color={theme.colors.palette.primary500} size={20} />
			<Text>{content}</Text>
		</Pressable>
	);
});
