import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { ResourceId } from "@/types";
import { CALCULATOR } from "../api";

const baseQueryKey = "CALCULATOR";

const getCalculatorsOpts = () => {
	return queryOptions({
		queryKey: [baseQueryKey],
		queryFn: CALCULATOR.ALL,
		//queryFn: ({ pageParam }) => CALCULATOR.ALL(pageParam),
		// initialPageParam: { limit: 10, page: 1 },
		// getNextPageParam: ({ paginate }) => {
		// 	if (!paginate.hasMore) return null;
		// 	return {
		// 		limit: 10,
		// 		page: paginate.nextPage,
		// 	};
		// },
	});
};

const useGetCalculators = () => {
	const opts = getCalculatorsOpts();
	const { data, ...rest } = useSuspenseQuery(opts);

	// const calculators = useMemo(
	// 	() => data.pages.flatMap((page) => page.data),
	// 	[data],
	// );

	return { calculators: data.data, ...rest };
};

const getCalculatorOpts = (calcId: ResourceId) => {
	return queryOptions({
		queryKey: [baseQueryKey, calcId] as const,
		queryFn: ({ queryKey }) => CALCULATOR.ONE(queryKey[1]),
		//queryFn: ({ pageParam }) => CALCULATOR.ALL(pageParam),
		// initialPageParam: { limit: 10, page: 1 },
		// getNextPageParam: ({ paginate }) => {
		// 	if (!paginate.hasMore) return null;
		// 	return {
		// 		limit: 10,
		// 		page: paginate.nextPage,
		// 	};
		// },
	});
};

const useGetCalculator = (calcId: ResourceId) => {
	const opts = getCalculatorOpts(calcId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return { calculators: data.data, ...rest };
};

export { useGetCalculators, useGetCalculator };
