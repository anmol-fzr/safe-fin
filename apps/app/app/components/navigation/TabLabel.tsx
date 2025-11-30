import type { TextStyle } from "react-native";
import { t } from "@/i18n";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "../Text";

//<K extends KeysOf<"mainNavigator">>

interface TabLabelProps {
	focused: boolean;
	color: string;
	children: string;
	size?: number;
}

//const translate = t("mainNavigator").bind(null);
//const tabBarLabel = translate.bind(null);

export function TabLabel(props: TabLabelProps) {
	const { focused, children } = props;

	const {
		theme: { colors },
		themed,
	} = useAppTheme();

	return (
		<Text
			style={[
				themed($tabBarLabel),
				{ color: focused ? colors.tint : colors.tintInactive },
			]}
		>
			{children}
		</Text>
	);
}

const $tabBarLabel: ThemedStyle<TextStyle> = ({
	colors,
	typography,
	spacing,
}) => ({
	fontSize: 12,
	fontFamily: typography.primary.medium,
	lineHeight: 16,
	marginTop: spacing.xxs,
	color: colors.tintInactive,
});
