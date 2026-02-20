import { QueryClient } from "@tanstack/react-query";
import { envs } from "../envs";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			staleTime: envs.isDev ? 0 : undefined,
			gcTime: envs.isDev ? 0 : undefined,
		},
	},
});
