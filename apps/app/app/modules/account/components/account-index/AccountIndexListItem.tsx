import { type ExternalPathString, type Href, Link } from "expo-router";
import { ArrowRight2, type Icon as IconType } from "iconsax-react-nativejs";
import { Pressable, View } from "react-native";
import { Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import type { TxKeyPath } from "@/i18n";
import { $styles, type ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

type BaseItem = {
	icon: IconType;
	title: TxKeyPath;
	desc?: TxKeyPath;
};

type LinkItem = BaseItem & {
	type: "link";
	href: ExternalPathString | Href;
};

type ActionItem = BaseItem & {
	type: "action";
	action: () => void | Promise<void>;
};

type AccountItem = LinkItem | ActionItem;

interface AccountIndexListItemProps {
	item: AccountItem;
}

export const AccountIndexListItem = (props: AccountIndexListItemProps) => {
	const { item } = props;

	return item.type === "link" ? (
		<Link href={item.href} push>
			<Item {...item} />
		</Link>
	) : (
		<Pressable onPress={item.action}>
			<Item {...item} />
		</Pressable>
	);
};

interface ItemProps {
	icon: IconType;
	title: TxKeyPath;
	desc?: TxKeyPath;
}

const Item = ({ icon, title, desc }: ItemProps) => {
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<View style={themed($itemRoot)}>
			<IconSax icon={icon} size={24} color={colors.text} />

			<View style={$styles.flex1}>
				<Text size="md" tx={title} />
				{desc && <Text size="xs" color="dim" tx={desc} />}
			</View>

			<IconSax icon={ArrowRight2} />
		</View>
	);
};

const $itemRoot: ThemedViewStyle = (theme) => ({
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing.md,
});
