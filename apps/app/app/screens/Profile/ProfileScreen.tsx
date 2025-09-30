import { Button, Screen, ScreenHeader } from "@/components";
import { ProfileForm } from "@/components/forms";
import { useAuthStore } from "@/modules/Auth/store";
import { $styles } from "@/theme";

export const ProfileScreen = () => {
	const logout = useAuthStore((state) => state.resetData);

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
