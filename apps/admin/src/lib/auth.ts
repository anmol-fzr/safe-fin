import { createAuthClient } from "better-auth/react";
import {
	phoneNumberClient,
	adminClient,
	multiSessionClient,
} from "better-auth/client/plugins";
import { envs } from "./envs";
import { useAuthStore } from "@/store/useAuthStore";

export const authClient = createAuthClient({
	baseURL: envs.API_URL,
	plugins: [phoneNumberClient(), adminClient(), multiSessionClient()],
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
