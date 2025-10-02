import { Button, Screen, ScreenHeader } from "@/components";
import { ProfileForm } from "@/components/forms";
import { $styles } from "@/theme";
import { logout } from "@/utils/auth";

export const ProfileScreen = () => {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="profileScreen:title"
				tagLineTx="profileScreen:tagLine"
			/>

			<ProfileForm />
			<Button tx="common:logOut" onPress={logout} />
		</Screen>
	);
};
