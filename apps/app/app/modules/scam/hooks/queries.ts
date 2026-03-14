import {
	infiniteQueryOptions,
	queryOptions,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { SCAM } from "../api";

const baseQueryKey = "SCAMS";

const getScamsOpts = () => {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey],
		queryFn: ({ pageParam }) => SCAM.ALL(pageParam),
		initialPageParam: { limit: 10, page: 1 },
		getNextPageParam: ({ paginate }, allPages, lastPageParam) => {
			if (!paginate.hasMore) return null;
			return {
				limit: lastPageParam.limit,
				page: paginate.nextPage,
			};
		},
	});
};

const useGetScams = () => {
	const opts = getScamsOpts();
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	const scams = useMemo(() => data.pages.flatMap((page) => page.data), [data]);

	return { scams, ...rest };
};

const getScamOpts = (scamId: number) => {
	return queryOptions({
		queryKey: [baseQueryKey, scamId] as const,
		queryFn: ({ queryKey }) => SCAM.ONE(queryKey[1]),
	});
};

const useGetScam = (scamId: number) => {
	const opts = getScamOpts(scamId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return { scam: data.data, ...rest };
};

export { getScamsOpts, getScamOpts };
export { useGetScams, useGetScam };
