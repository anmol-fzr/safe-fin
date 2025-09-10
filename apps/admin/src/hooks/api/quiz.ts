import { API } from "@/services";
import type { IReqParams, ResourceId } from "@/services/api/types";
import {
	infiniteQueryOptions,
	queryOptions,
	mutationOptions,
	useMutation,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import {
	createToastMessages,
	initialPageParam,
	useInvalidateResource,
	useResourceActionToast,
} from "./defaults";

const baseQueryKey = "QUIZ";
const { createMsg, updateMsg, deleteMsg } = createToastMessages("Quiz");

function getQuizzesOpts(params: IReqParams) {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey, params] as const,
		queryFn: ({ queryKey }) => API.QUIZ.GET(queryKey[1]),
		initialPageParam,
		getNextPageParam: () => undefined,
	});
}

const useGetQuizzes = (params: IReqParams) => {
	const opts = getQuizzesOpts(params);
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	return {
		quizzes: data,
		...rest,
	};
};

function getQuizOpts(quizId: ResourceId) {
	return queryOptions({
		queryKey: [baseQueryKey, quizId] as const,
		queryFn: ({ queryKey }) => API.QUIZ.ONE(queryKey[1]),
	});
}
const useGetQuiz = (quizId: ResourceId) => {
	const opts = getQuizOpts(quizId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return {
		quiz: data,
		...rest,
	};
};

const useCreateQuiz = () => {
	const toast = useResourceActionToast();
	const { invalidateQuizzes } = useInvalidateQuizzes();

	const { loadingMsg, successMsg, errorMsg } = createMsg;

	const { mutate, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "CREATE"],
		mutationFn: API.QUIZ.CREATE,
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: ({ message = successMsg }) => {
			toast.success(message);
			invalidateQuizzes();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		createQuiz: mutate,
		...rest,
	};
};

export { useGetQuizzes, useGetQuiz, useCreateQuiz };
export { getQuizzesOpts, getQuizOpts };

const useInvalidateQuizzes = () => {
	const { invalidateResource } = useInvalidateResource(baseQueryKey);

	return { invalidateQuizzes: invalidateResource };
};
