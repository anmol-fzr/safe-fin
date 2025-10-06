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
		queryFn: SCAM.GET,
		initialPageParam: {
			limit: 10,
			offset: 0,
		},
		getNextPageParam: () => {
			return undefined;
		},
	});
};

const useGetScams = () => {
	const opts = getScamsOpts();
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	const scams = useMemo(() => data.pages.flatMap((page) => page), [data]);

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

	return { scam: data, ...rest };
};

export { getScamsOpts, getScamOpts };
export { useGetScams, useGetScam };
