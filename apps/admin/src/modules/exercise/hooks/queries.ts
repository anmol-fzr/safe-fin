import { useMemo } from "react";
import { EXERCISE } from "../api";
import {
	infiniteQueryOptions,
	queryOptions,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useInvalidateResource } from "@/hooks/api/defaults";
import type { ResourceId } from "@/services/api/types";

function getExercisesOpts() {
	return infiniteQueryOptions({
		queryKey: ["EXERCISE"] as const,
		queryFn: EXERCISE.ALL,
		initialPageParam: { limit: 10, skip: 0 },
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			const total = allPages[allPages.length - 1].paginate.total;
			const totalFetched = allPages.reduce((prev, curr) => {
				return prev + curr.data.length;
			}, 0);

			return totalFetched < total
				? {
						limit: lastPageParam.limit,
						skip: lastPageParam.skip + lastPageParam.limit,
					}
				: undefined;
		},
	});
}

const useGetExercises = () => {
	const opts = getExercisesOpts();
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	// const exercises = useMemo(
	// 	() => data.pages.flatMap((page) => page.data) ?? [],
	// 	[data],
	// );

	return {
		data,
		...rest,
	};
};

function getExerciseOpts(exerciseId: ResourceId) {
	return queryOptions({
		queryKey: ["EXERCISE", exerciseId] as const,
		queryFn: () => EXERCISE.ONE(exerciseId),
	});
}

const useGetExercise = (exerciseId: ResourceId) => {
	const opts = getExerciseOpts(exerciseId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return {
		exercise: data.data,
		...rest,
	};
};

const useInvalidateExercises = () => {
	const { invalidateResource } = useInvalidateResource("EXERCISE");

	return { invalidateExercises: invalidateResource };
};

export { getExercisesOpts, useGetExercises };
export { getExerciseOpts, useGetExercise };
export { useInvalidateExercises };
