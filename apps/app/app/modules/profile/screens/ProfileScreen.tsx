import { authClient, logout } from "@auth/utils";
import { Button, Screen, ScreenHeader } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useAuthStore } from "@/modules/auth/store";
import { $styles } from "@/theme";
import { envs } from "@/utils/envs";
import { ProfileForm } from "../components";

export const ProfileScreen = () => {
	const navigation = useSafeNavigation();
	const resetAuthStore = useAuthStore((state) => state.resetData);

	function goToDebug() {
		navigation.navigate("Debug");
	}

	function handleLogout() {
		authClient.signOut(
			{},
			{
				onSuccess() {
					resetAuthStore();
					navigation.navigate("Auth", { screen: "Login" });
				},
			},
		);
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
			{envs.isDev && <Button text="Debug Screen" onPress={goToDebug} />}
		</Screen>
	);
};
