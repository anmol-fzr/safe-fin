import { useResourceActionToast } from "@safe-fin/ui/hooks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store";
import { authClient } from "../utils";

export const useGuestLogin = () => {
	const setAuthData = useAuthStore((state) => state.setData);
	const setAuthState = useAuthStore((state) => state.setState);

	const router = useRouter();

	const toast = useResourceActionToast();

	const {
		isPending: isGuestLoginPending,
		mutate,
		...rest
	} = useMutation({
		mutationKey: ["USER", "LOGIN"],
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
			router.push("/tabs");
		},
		onError(error) {
			console.log(error);
			console.log(error.name, error.message, error?.cause);

			toast.error("Unable to Login as Guest");
		},
	});

	return {
		isGuestLoginPending,
		handleGuestLogin: mutate,
		...rest,
	};
};
