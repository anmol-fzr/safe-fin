import { createAdminAuthClient } from "@safe-fin/auth/admin";
import { useAuthStore } from "@/store/useAuthStore";
import { envs } from "./envs";

export const authClient = createAdminAuthClient({
	baseURL: envs.API_URL,
});

export type AuthType = (typeof authClient)["$Infer"]["Session"];

export type IUser = AuthType["user"] & {
	role: "user" | "admin";
};
export type Session = AuthType["session"];

export async function logout() {
	await authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				window.location.href = "/";
			},
		},
	});
	useAuthStore.getState().resetData();
	window.location.href = "/";
}
