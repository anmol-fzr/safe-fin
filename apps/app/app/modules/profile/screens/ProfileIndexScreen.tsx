import { Logout } from "iconsax-react-nativejs";
import { Button, Screen } from "@/components";
import { useIsGuestUser } from "@/modules/auth/hooks/use-guest-login";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useAppTheme } from "@/utils/useAppTheme";
import { AccountSettingsList } from "../components/account-settings-list";
import { AppInfoList } from "../components/app-info-list";

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
