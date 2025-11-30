import { useResourceActionToast } from "@safe-fin/ui/hooks";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useAuthStore } from "../store";
import { authClient } from "../utils";

export const useAuth = () => {
	const resetAuthStore = useAuthStore((state) => state.resetData);
	const navigation = useSafeNavigation();
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

	return { handleLogout };
};
