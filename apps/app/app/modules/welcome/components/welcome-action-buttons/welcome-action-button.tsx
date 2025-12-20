import type { Href } from "expo-router";
import { Link } from "expo-router";
import type { ViewStyle } from "react-native";
import { Button, Text } from "@/components";
import { type TxKeyPath, translate } from "@/i18n";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const $actionBtn: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	margin: spacing.lg,
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
					<Text preset="subheading" style={{ color: colors.textInverse }}>
						{translate(labelTx)}
					</Text>
				</Button>
			</Link.Trigger>
			<Link.Preview />
		</Link>
	);
};
