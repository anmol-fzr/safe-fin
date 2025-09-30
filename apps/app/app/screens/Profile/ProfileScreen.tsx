import { Button, Screen, ScreenHeader } from "@/components";
import { ProfileForm } from "@/components/forms";
import { useStores } from "@/models";
import { $styles } from "@/theme";

export const ProfileScreen = () => {
	const {
		authenticationStore: { logout },
	} = useStores();
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
