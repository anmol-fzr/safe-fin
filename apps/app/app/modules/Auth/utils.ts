import { createAuthClient } from "better-auth/react";
import { phoneNumberClient } from "better-auth/client/plugins";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { envs } from "@/utils/envs";
import { useAuthStore } from "@/modules/Auth/store";

export const authClient = createAuthClient({
	baseURL: envs.API_URL,
	plugins: [
		expoClient({
			scheme: "safefin",
			storagePrefix: "safefin",
			storage: SecureStore,
		}),
		phoneNumberClient(),
	],
});

export async function logout() {
	await authClient.signOut();
	useAuthStore.getState().resetData();
}
