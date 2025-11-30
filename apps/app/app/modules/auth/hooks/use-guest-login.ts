import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useAuthStore } from "../store";
import { authClient } from "../utils";

export const useGuestLogin = () => {
	const setAuthData = useAuthStore((state) => state.setData);
	const setAuthState = useAuthStore((state) => state.setState);

	const navigation = useSafeNavigation();

	const handleGuestLogin = async () => {
		try {
			const data = await authClient.signIn.anonymous();
			if (data.error) {
				console.error(data.error);
				return;
			}
			const { id, email, name } = data.data.user;

			setAuthData({ user: { id, email, name, isAnonymous: true } });

			setAuthState("complete");
			navigation.navigate("MainTabs", { screen: "Home" });
		} catch (error) {
			console.error(error);
		}
	};

	return { handleGuestLogin };
};

export const useIsGuestUser = () => {
	const isAnonymous = useAuthStore((state) => state.user?.isAnonymous ?? false);

	return isAnonymous;
};
