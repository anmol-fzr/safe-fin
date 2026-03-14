import { Screen } from "@/components";
import { GuestSafe } from "@/components/guest/GuestSafe";
import { UpdateProfileForm } from "@/modules/profile/components";
import { $styles } from "@/theme";

export default function EditProfileScreen() {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<GuestSafe>
				<UpdateProfileForm />
			</GuestSafe>
		</Screen>
	);
}
