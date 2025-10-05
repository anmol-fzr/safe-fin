import type { createAuthClient } from "better-auth/react";
import { createContext, type PropsWithChildren } from "react";
import { useSafeContext } from "./useSafeContext";

type AuthContextType = ReturnType<typeof createAuthClient>;

const AuthContext = createContext<AuthContextType | null>(null);
AuthContext.displayName = "AuthContext";
//const AuthContextProvider = AuthContext.Provider;

type AuthProviderProps = PropsWithChildren & {
	client: AuthContextType;
};

const AuthProvider = ({ client, children }: AuthProviderProps) => {
	return <AuthContext value={client}>{children}</AuthContext>;
};

const useAuthClient = () => useSafeContext(AuthContext, useAuthClient.name);

export { AuthProvider, useAuthClient };
