import { createAuthClient } from "better-auth/react";
import {
	phoneNumberClient,
	adminClient,
	multiSessionClient,
} from "better-auth/client/plugins";
import { envs } from "./envs";
import { redirect } from "@tanstack/react-router";

export const authClient = createAuthClient({
	baseURL: envs.API_URL,
	plugins: [phoneNumberClient(), adminClient(), multiSessionClient()],
});

export function logout() {
	authClient.signOut();
	window.location.href = "/";
}

export interface Session {
	expiresAt: string;
	token: string;
	createdAt: string;
	updatedAt: string;
	ipAddress: string;
	userAgent: string;
	userId: string;
	impersonatedBy: any;
	id: string;
}

export interface User {
	name: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	createdAt: string;
	updatedAt: string;
	role: string;
	banned: any;
	banReason: any;
	banExpires: any;
	phoneNumber: string;
	phoneNumberVerified: boolean;
	id: string;
}
