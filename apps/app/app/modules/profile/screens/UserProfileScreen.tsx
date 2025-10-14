import { authClient } from "@auth/utils";
import { useResourceActionToast } from "@safe-fin/ui/hooks";
import { LogOutIcon } from "lucide-react-native";
import { Button, GoBack, Screen } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useAuthStore } from "@/modules/auth/store";
import { $styles } from "@/theme";
import { ProfileForm } from "../components";

export const UserProfileScreen = () => {
	const navigation = useSafeNavigation();
	const resetAuthStore = useAuthStore((state) => state.resetData);
	const toast = useResourceActionToast();

	function handleLogout() {
		authClient.signOut(
			{},
			{
				onRequest() {
					toast.loading("Logging out ...");
				},
				onSuccess() {
					resetAuthStore();
					//navigation.popToTop();
					navigation.navigate("Auth", { screen: "Login" });
					toast.success("Logged Out");
				},
				onError(err) {
					console.log(err);
					navigation.navigate("Auth", { screen: "Login" });
					toast.loading("Unable to Log Out");
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
			<GoBack tx="profileScreen:title" />
			<ProfileForm />

			<Button
				tx="common:logOut"
				onPress={handleLogout}
				style={{ marginTop: 24 }}
				RightAccessory={() => (
					<LogOutIcon style={{ marginLeft: 12 }} size={20} />
				)}
			/>
		</Screen>
	);
};
