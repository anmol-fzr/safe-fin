import { useResourceActionToast } from "@safe-fin/ui/hooks";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useAuthStore } from "../store";
import { authClient } from "../utils";

export const useGuestLogin = () => {
	const setAuthData = useAuthStore((state) => state.setData);
	const setAuthState = useAuthStore((state) => state.setState);

	const navigation = useSafeNavigation();

	const toast = useResourceActionToast();

	const {
		isPending: isGuestLoginPending,
		mutate,
		...rest
	} = useMutation({
		mutationKey: ["USER", "UPDATE"],
		mutationFn: () => {
			return authClient.signIn.anonymous();
		},
		onMutate() {
			toast.loading("Login as Guest ...");
		},
		onSuccess(data) {
			if (!data || !data?.data || !data.data.user) {
				console.error("Unable to Login as Guest");
			}

			const { id, email, name } = data.data.user;

			toast.success("Login as Guest Succesfull");

			setAuthData({ user: { id, email, name, isAnonymous: true } });
			setAuthState("complete");
			navigation.navigate("MainTabs", { screen: "Home" });
		},
		onError() {
			toast.error("Unable to Login as Guest");
		},
	});

	const handleGuestLogin = useCallback(() => {
		mutate();
	}, []);

	return {
		isGuestLoginPending,
		handleGuestLogin,
		...rest,
	};
};

export const useIsGuestUser = () => {
	const isAnonymous = useAuthStore((state) => state.user?.isAnonymous ?? false);

	return isAnonymous;
};
