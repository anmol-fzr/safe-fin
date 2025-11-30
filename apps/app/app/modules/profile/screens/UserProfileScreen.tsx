import { Logout as LogoutIcon } from "iconsax-react-nativejs";
import { Button, GoBack, Screen } from "@/components";
import { GuestSafe } from "@/components/guest/GuestSafe";
import { useIsGuestUser } from "@/modules/auth/hooks/use-guest-login";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { $styles } from "@/theme";
import { ProfileForm } from "../components";

export const UserProfileScreen = () => {
	const isGuest = useIsGuestUser();

	const { handleLogout } = useAuth();

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="profileScreen:title" />

			<GuestSafe>
				<ProfileForm />
			</GuestSafe>

			{!isGuest && (
				<Button
					tx="common:logOut"
					onPress={handleLogout}
					style={{ marginTop: 24 }}
					RightAccessory={() => (
						<LogoutIcon style={{ marginLeft: 12 }} size={20} />
					)}
				/>
			)}
		</Screen>
	);
};
