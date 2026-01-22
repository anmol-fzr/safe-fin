import { useResourceActionToast } from "@safe-fin/ui/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { onLogout } from "@/utils/crashReporting";
import { useAuthStore } from "../store";
import { authClient } from "../utils";

export const useAuth = () => {
	const resetAuthStore = useAuthStore((state) => state.resetData);
	const isLogin = useAuthStore((state) => state.user !== null);
	const { navigate } = useRouter();
	const toast = useResourceActionToast();
	const queryClient = useQueryClient();

	const handleLogout = useCallback(() => {
		authClient.signOut(
			{},
			{
				onRequest() {
					toast.loading("Logging out ...");
				},
				onSuccess() {
					resetAuthStore();
					onLogout();
					//navigation.popToTop();
					navigate("/auth");
					queryClient.invalidateQueries();
					toast.success("Logged Out");
				},
				onError(err) {
					console.log(err);
					navigate("/auth");
					toast.loading("Unable to Log Out");
				},
			},
		);
	}, [toast, navigate, resetAuthStore, queryClient]);

	return { handleLogout, isLogin };
};
