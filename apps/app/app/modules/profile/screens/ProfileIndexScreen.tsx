import { type Icon as IconType, Logout } from "iconsax-react-nativejs";
import { View } from "react-native";
import { Button, Screen, Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { type TxKeyPath, translate } from "@/i18n";
import { useIsGuestUser } from "@/modules/auth/hooks/use-guest-login";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useAppTheme } from "@/utils/useAppTheme";
import { AccountSettingsList } from "../components/account-settings-list";
import { AppInfoList } from "../components/app-info-list";

interface ItemContentProps {
	icon: IconType;
	titleTx: TxKeyPath;
	descTx?: TxKeyPath;
}

export const ItemContent = ({ icon, titleTx, descTx }: ItemContentProps) => {
	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				gap: 12,
				alignItems: "center",
				paddingBottom: 12,
				paddingLeft: 12,
			}}
		>
			<IconSax icon={icon} />
			<View>
				<Text size="lg" weight="medium">
					{translate(titleTx)}
				</Text>
				{descTx && (
					<Text size="xs" style={{ color: colors.textDim }}>
						{translate(descTx)}
					</Text>
				)}
			</View>
		</View>
	);
};

export const SectionHeader = ({ title }: { title: string }) => {
	const {
		theme: { spacing },
	} = useAppTheme();
	return (
		<Text preset="subheading" size="xl" style={{ marginBottom: spacing.sm }}>
			{title}
		</Text>
	);
};
// --- Main Screen ---

export const ProfileIndexScreen = () => {
	const isGuest = useIsGuestUser();
	const { handleLogout } = useAuth();

	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={{
				gap: spacing.xl,
				padding: spacing.xs,
				paddingBottom: spacing.xxl,
			}}
		>
			<AccountSettingsList />
			<AppInfoList />

			{isGuest && (
				<Button
					tx="common:logOutAsGuest"
					onPress={handleLogout}
					preset="reversed"
					RightAccessory={() => (
						<Logout style={{ marginLeft: 12 }} size={20} color="#fff" />
					)}
				/>
			)}
		</Screen>
	);
};
