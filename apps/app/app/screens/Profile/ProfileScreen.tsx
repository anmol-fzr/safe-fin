import { logout } from "@auth/utils";
import { Button, Screen, ScreenHeader } from "@/components";
import { ProfileForm } from "@/components/forms";
//import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { $styles } from "@/theme";

export const ProfileScreen = () => {
	//const navigation = useSafeNavigation();

	function handleLogout() {
		logout();
		//navigation.navigate("Auth", { screen: "Login" });
	}
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
			<Button tx="common:logOut" onPress={handleLogout} />
		</Screen>
	);
};
