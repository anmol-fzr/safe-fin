import { Screen } from "@/components";
import { GuestSafe } from "@/components/guest/GuestSafe";
//import { useAuth } from "@/modules/auth/hooks/useAuth";
import { $styles } from "@/theme";
import { UpdateProfileForm } from "@/modules/profile/components";
//import { LogoutButton } from "@/modules/auth/components/LogoutButton";

export default function EditProfileScreen() {
	//const { isGuest } = useAuth();

	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<GuestSafe>
				<UpdateProfileForm />
			</GuestSafe>

			{/*
			{!isGuest && <LogoutButton style={{ marginTop: 24 }} />}
      */}
		</Screen>
	);
}
