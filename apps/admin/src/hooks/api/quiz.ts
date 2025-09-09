import { API } from "@/services";
import type { IReqParams, ResourceId } from "@/services/api/types";
import {
	infiniteQueryOptions,
	queryOptions,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { initialPageParam } from "./defaults";

function getQuizzesOpts(params: IReqParams) {
	return infiniteQueryOptions({
		queryKey: ["QUIZ", params] as const,
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
		queryKey: ["QUIZ", quizId] as const,
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

export { useGetQuizzes, useGetQuiz };
export { getQuizzesOpts, getQuizOpts };
