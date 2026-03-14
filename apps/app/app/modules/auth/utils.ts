import { createAppAuthClient } from "@safe-fin/auth/app";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/modules/auth/store";
import { onLogout } from "@/utils/crashReporting";
import { envs } from "@/utils/envs";
import { queryClient } from "@/utils/lib/query";

export const authClient = createAppAuthClient({
	baseURL: envs.AUTH_API_URL,
	storage: SecureStore,
});

export type Session = (typeof authClient)["$Infer"]["Session"]["session"];

export async function logout() {
	if (!useAuthStore.getState().user) {
		return;
	}
	queryClient.invalidateQueries();
	useAuthStore.getState().resetData();
	onLogout();
	try {
		await authClient.signOut();
	} catch (error) {
		console.log("Error signing out", error);
	}
}
