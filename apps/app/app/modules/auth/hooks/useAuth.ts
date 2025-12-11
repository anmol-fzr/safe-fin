import { useResourceActionToast } from "@safe-fin/ui/hooks";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useAuthStore } from "../store";
import { authClient } from "../utils";

export const useAuth = () => {
	const resetAuthStore = useAuthStore((state) => state.resetData);
	const isLogin = useAuthStore((state) => state.user !== null);
	const { navigate } = useRouter();
	const toast = useResourceActionToast();

	const handleLogout = useCallback(() => {
		authClient.signOut(
			{},
			{
				onRequest() {
					toast.loading("Logging out ...");
				},
				onSuccess() {
					resetAuthStore();
					//navigation.popToTop();
					navigate("/auth");
					toast.success("Logged Out");
				},
				onError(err) {
					console.log(err);
					navigate("/auth");
					toast.loading("Unable to Log Out");
				},
			},
		);
	}, [toast, navigate, resetAuthStore]);

	return { handleLogout, isLogin };
};
