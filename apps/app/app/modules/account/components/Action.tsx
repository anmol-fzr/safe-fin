import { Link, type LinkProps } from "expo-router";
import type { Icon as IconType } from "iconsax-react-nativejs";
import { PressableScale } from "pressto";
import { View } from "react-native";
import { Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { $styles, type ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

type ActionProps = {
	title: string;
	icon: IconType;
	href: LinkProps["href"];
};

export const Action = (props: ActionProps) => {
	const { title, icon, href } = props;
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<Link href={href} asChild>
			<PressableScale style={themed($root)}>
				<View style={themed($iconWrapper)}>
					<IconSax icon={icon} color={colors.tint} />
				</View>
				<Text>{title}</Text>
			</PressableScale>
		</Link>
	);
};

const $iconWrapper: ThemedViewStyle = (theme) => ({
	padding: 8,
	backgroundColor: theme.colors.palette.primary100,
	borderRadius: 20,
});

const $root: ThemedViewStyle = (theme) => ({
	backgroundColor: theme.colors.palette.neutral200,
	flex: 1,
	padding: theme.spacing.md,
	borderRadius: theme.roundness * 1.25,
	flexDirection: "row",
	alignItems: "center",
	gap: 8,
});
