import { createAdminAuthClient } from "@safe-fin/auth/admin";
import { useAuthStore } from "@/store/useAuthStore";
import { envs } from "./envs";

export const authClient = createAdminAuthClient({
	baseURL: envs.AUTH_API_URL,
});

export type AuthType = (typeof authClient)["$Infer"]["Session"];

export type IUser = AuthType["user"] & {
	role: "user" | "admin";
};
export type Session = AuthType["session"];

export async function logout() {
	if (!useAuthStore.getState().isLogin) {
		useAuthStore.getState().resetData();
		window.location.href = "/";
		return;
	}
	try {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					window.location.href = "/";
				},
			},
		});
	} finally {
		useAuthStore.getState().resetData();
		window.location.href = "/";
	}
}
