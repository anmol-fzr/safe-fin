import { useMutation } from "@tanstack/react-query";
import { EXERCISE } from "../api";
import type { IReqSaveExerciseResult } from "../api";
import { ResourceId } from "@/types";

interface UseSaveExerciseResultPayload extends IReqSaveExerciseResult {
	exerciseId: ResourceId;
}

export const useSaveExerciseResult = () => {
	const { mutate, mutateAsync, status, ...rest } = useMutation({
		mutationFn: (payload: UseSaveExerciseResultPayload) =>
			EXERCISE.RESULT.SAVE(payload.exerciseId, payload),
	});

	return {
		saveExerciseResult: mutate,
		saveExerciseResultAsync: mutateAsync,
		saveExerciseResultStatus: status,
		...rest,
	};
};
