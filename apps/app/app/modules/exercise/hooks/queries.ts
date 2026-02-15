import {
	queryOptions,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import type { ResourceId } from "@/types";
import { EXERCISE } from "../api";

function getExerciseOpts(unitId: ResourceId) {
	return queryOptions({
		queryKey: ["EXERCISE", unitId],
		queryFn: () => EXERCISE.ONE(unitId),
	});
}

const usePrefetchExercise = () => {
	const queryClient = useQueryClient();

	function prefetchExercise(id: ResourceId) {
		queryClient.prefetchQuery(getExerciseOpts(id));
	}

	return { prefetchExercise };
};

const useGetExercise = (unitId: ResourceId) => {
	const opts = getExerciseOpts(unitId);
	const { data, ...rest } = useSuspenseQuery(opts);
	return { exercise: data.data, ...rest };
};

function getExerciseResultOpts(exerciseId: ResourceId) {
	return queryOptions({
		queryKey: ["EXERCISE", exerciseId, "RESULT"],
		queryFn: () => EXERCISE.RESULT.ONE(exerciseId),
	});
}

const useGetExerciseResult = (exerciseId: ResourceId) => {
	const opts = getExerciseResultOpts(exerciseId);
	const { data, ...rest } = useSuspenseQuery(opts);

	//return { results: data.data.results[0].questions, ...rest };
	return { attempts: data.data, ...rest };
};

export { getExerciseOpts, useGetExercise, usePrefetchExercise };
export { getExerciseResultOpts, useGetExerciseResult };
