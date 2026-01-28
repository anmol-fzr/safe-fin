import {
	queryOptions,
	usePrefetchQuery,
	useQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { authClient } from "@/modules/auth/utils";
import { DEMO_GRAPHICS } from "../api";

const getDemoGraphicsOpts = () => {
	return queryOptions({
		queryKey: ["USER", "PROFILE", "DEMO_GRAPHICS"],
		queryFn: DEMO_GRAPHICS.GET,
	});
};

const useGetDemoGraphics = () => {
	const opts = getDemoGraphicsOpts();
	return useQuery(opts);
};

const usePrefetchUserDemographics = () => {
	const opts = getDemoGraphicsOpts();
	return usePrefetchQuery(opts);
};

const getListSessionsOpts = () => {
	return queryOptions({
		queryKey: ["AUTH", "LIST", "SESSIONS"],
		queryFn: () => authClient.listSessions(),
	});
};

const useListSessions = () => {
	const opts = getListSessionsOpts();
	const { data, isRefetching, refetch, ...rest } = useSuspenseQuery(opts);
	const sessions = data?.data ?? [];

	return {
		sessions,
		isRefetchingSessions: isRefetching,
		refetchSessions: refetch,
		...rest,
	};
};

const useSession = () => {
	const { data, ...rest } = useQuery({
		queryKey: ["AUTH", "SESSION"],
		queryFn: () => authClient.getSession(),
	});
	const currSession = data?.data?.session;
	const currUser = data?.data?.user;

	return { currSession, currUser, ...rest };
};

export { getDemoGraphicsOpts, getListSessionsOpts };
export {
	useGetDemoGraphics,
	useListSessions,
	useSession,
	usePrefetchUserDemographics,
};
