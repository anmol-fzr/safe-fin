import {
	queryOptions,
	usePrefetchQuery,
	useQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { authClient } from "@/modules/auth/utils";
import { DEMO_GRAPHICS, PROFILE } from "../api";

export const getPublicProfileOpts = (userId?: string) => {
	return queryOptions({
		queryKey: ["USER", "PROFILE", "PUBLIC", userId],
		queryFn: () => PROFILE.PUBLIC(userId),
	});
};

export const useGetPublicProfile = (userId?: string) => {
	const opts = getPublicProfileOpts(userId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return { data: data.data, ...rest };
};

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

const getSessionOpts = () => {
	return queryOptions({
		queryKey: ["AUTH", "SESSION"],
		queryFn: () => authClient.getSession(),
	});
};

const useSession = () => {
	const opts = getSessionOpts();

	const { data, ...rest } = useQuery(opts);
	const currSession = data?.data?.session;
	const currUser = data?.data?.user;

	return { currSession, currUser, ...rest };
};

export { getDemoGraphicsOpts, getListSessionsOpts };
export {
	useGetDemoGraphics,
	useListSessions,
	getSessionOpts,
	useSession,
	usePrefetchUserDemographics,
};
