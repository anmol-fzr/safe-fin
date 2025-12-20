import { createAppAuthClient } from "@safe-fin/auth/app";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/modules/auth/store";
import { envs } from "@/utils/envs";
import { queryClient } from "@/utils/lib/query";

export const authClient = createAppAuthClient({
	baseURL: envs.API_URL,
	storage: SecureStore,
});

export type Session = (typeof authClient)["$Infer"]["Session"]["session"];

export async function logout() {
	queryClient.invalidateQueries();
	useAuthStore.getState().resetData();
	await authClient.signOut();
}
