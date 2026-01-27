import { Screen } from "@/components";
import { GuestSafe } from "@/components/guest/GuestSafe";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { $styles } from "@/theme";
import { ProfileForm } from "../components";
import { LogoutButton } from "@/modules/auth/components/LogoutButton";

export const UserProfileScreen = () => {
	const { isGuest } = useAuth();

	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<GuestSafe>
				<ProfileForm />
			</GuestSafe>

			{!isGuest && <LogoutButton style={{ marginTop: 24 }} />}
		</Screen>
	);
};
