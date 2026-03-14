import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createToastMessages,
	useResourceActionToast,
} from "@/hooks/api/defaults";
import { EXERCISE, OPTION, QUESTION } from "../api";
import { getExerciseOpts, useInvalidateExercises } from "./queries";

const KEY = "EXERCISE";
const { createMsg } = createToastMessages("Exercise");

export const useCreateExercise = () => {
	const toast = useResourceActionToast();
	const { invalidateExercises } = useInvalidateExercises();

	const { loadingMsg, successMsg, errorMsg } = createMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: [KEY, "CREATE"],
		mutationFn: EXERCISE.CREATE,
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: ({ message = successMsg }) => {
			toast.success(message);
			invalidateExercises();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		createExercise: mutate,
		...rest,
	};
};

export const useCreateQuestion = () => {
	const toast = useResourceActionToast();
	const queryClient = useQueryClient();

	const { loadingMsg, successMsg, errorMsg } = createMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: ["QUESTION", "CREATE"],
		mutationFn: QUESTION.CREATE,
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: (data) => {
			toast.success(data.message ?? successMsg);
			queryClient.invalidateQueries(getExerciseOpts(data.data.exerciseId));
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		createQuestion: mutate,
		...rest,
	};
};

export const useCreateOption = () => {
	const toast = useResourceActionToast();
	// const queryClient = useQueryClient();

	const { loadingMsg, successMsg, errorMsg } = createMsg;

	const { mutate, mutateAsync, ...rest } = useMutation({
		mutationKey: ["OPTION", "CREATE"],
		mutationFn: OPTION.CREATE,
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: (data) => {
			toast.success(data.message ?? successMsg);
			// queryClient.invalidateQueries(getExerciseOpts(data.data.exerciseId));
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		createOption: mutate,
		...rest,
	};
};
