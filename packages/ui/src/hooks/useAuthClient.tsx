import { createAdminAuthClient } from "@safe-fin/auth/admin";
import { createContext, type PropsWithChildren } from "react";
import { useSafeContext } from "./useSafeContext";

export type AuthClientType = ReturnType<typeof createAdminAuthClient>;

const AuthContext = createContext<AuthClientType | null>(null);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps extends PropsWithChildren {
	client: AuthClientType;
}

export const AuthProvider = ({ client, children }: AuthProviderProps) => {
	return <AuthContext.Provider value={client}>{children}</AuthContext.Provider>;
};

export const useAuthClient = (): AuthClientType => {
	return useSafeContext(AuthContext, useAuthClient.name);
};
