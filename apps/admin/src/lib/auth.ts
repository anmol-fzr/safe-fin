import { createAuthClient } from "better-auth/react";
import {
	phoneNumberClient,
	adminClient,
	multiSessionClient,
} from "better-auth/client/plugins";
import { envs } from "./envs";

export const authClient = createAuthClient({
	baseURL: envs.API_URL,
	plugins: [phoneNumberClient(), adminClient(), multiSessionClient()],
});

export type AuthType = (typeof authClient)["$Infer"]["Session"];

export type User = AuthType["user"] & {
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
	//window.location.href = "/";
}
