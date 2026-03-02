import type { Icon as IconType } from "iconsax-react-nativejs";
import { View, type ViewProps, type ViewStyle } from "react-native";
import { Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import type { TxKeyPath } from "@/i18n";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export const ProfileList = (props: ViewProps) => {
	return <View {...props} />;
};

interface SectionHeaderProps {
	title: string;
}

ProfileList.SectionHeader = ({ title }: SectionHeaderProps) => {
	const {
		theme: { spacing },
	} = useAppTheme();
	return (
		<Text preset="subheading" size="xl" style={{ marginBottom: spacing.sm }}>
			{title}
		</Text>
	);
};

ProfileList.List = (props: ViewProps) => {
	const { themed } = useAppTheme();

	return <View style={themed($profileList)} {...props} />;
};

const $profileList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	gap: spacing.sm,
});

interface ListItemProps {
	icon: IconType;
	titleTx: TxKeyPath;
	descTx?: TxKeyPath;
}

ProfileList.ListItem = ({ icon, titleTx, descTx }: ListItemProps) => {
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<View style={themed($profileListItem)}>
			<IconSax icon={icon} />
			<View>
				<Text size="lg" weight="medium" tx={titleTx} />
				{descTx && (
					<Text size="xs" style={{ color: colors.textDim }} tx={descTx} />
				)}
			</View>
		</View>
	);
};

const $profileListItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	flexDirection: "row",
	gap: spacing.sm,
	alignItems: "center",
	paddingBottom: spacing.sm,
	paddingLeft: spacing.sm,
});
