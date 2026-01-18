import {
	infiniteQueryOptions,
	queryOptions,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import type { ResourceId } from "@/types";
import { CALCULATOR } from "../api";

const baseQueryKey = "CALCULATOR";

const getCalculatorsOpts = () => {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey],
		queryFn: CALCULATOR.ALL,
		initialPageParam: { limit: 10, page: 1 },
		getNextPageParam: ({ paginate }) => {
			if (!paginate.hasMore) return null;
			return {
				limit: 10,
				page: paginate.nextPage,
			};
		},
	});
};

const useGetCalculators = () => {
	const opts = getCalculatorsOpts();
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	const calculators = useMemo(
		() => data.pages.flatMap((page) => page.data),
		[data],
	);

	return { calculators, ...rest };
};

const getCalculatorOpts = (calcId: ResourceId) => {
	return queryOptions({
		queryKey: [baseQueryKey, calcId] as const,
		queryFn: ({ queryKey }) => CALCULATOR.ONE(queryKey[1]),
	});
};

const useGetCalculator = (calcId: ResourceId) => {
	const opts = getCalculatorOpts(calcId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return { calculator: data.data, ...rest };
};

export { getCalculatorsOpts };
export { useGetCalculators, useGetCalculator };
