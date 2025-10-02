import { createAppAuthClient } from "@safe-fin/auth/app";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/modules/Auth/store";
import { envs } from "@/utils/envs";

export const authClient = createAppAuthClient({
	baseURL: envs.API_URL,
	storage: SecureStore,
});

export async function logout() {
	await authClient.signOut();
	useAuthStore.getState().resetData();
}
