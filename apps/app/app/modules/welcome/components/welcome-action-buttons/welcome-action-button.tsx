import type { Href } from "expo-router";
import { Link } from "expo-router";
import type { ViewStyle } from "react-native";
import { Button, Text } from "@/components";
import type { TxKeyPath } from "@/i18n";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const $actionBtn: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	margin: spacing.xxs,
	marginInline: spacing.lg,
	borderWidth: 0,
});

interface ActionButtonProps {
	href: Href;
	labelTx: TxKeyPath;
}

export const WelcomeActionButton = (props: ActionButtonProps) => {
	const { href, labelTx } = props;
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<Link href={href} asChild prefetch>
			<Link.Trigger>
				<Button style={themed($actionBtn)} preset="reversed">
					<Text
						preset="subheading"
						style={{ color: colors.textInverse }}
						tx={labelTx}
					/>
				</Button>
			</Link.Trigger>
			<Link.Preview />
		</Link>
	);
};
