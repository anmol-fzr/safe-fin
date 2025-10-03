import { createAppAuthClient } from "@safe-fin/auth/app";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/modules/auth/store";
import { envs } from "@/utils/envs";

export const authClient = createAppAuthClient({
	baseURL: envs.API_URL,
	storage: SecureStore,
});

export async function logout() {
	useAuthStore.getState().resetData();
	await authClient.signOut();
}
