import { API } from "@/services";
import type { IReqParams } from "@/services/api/types";
import {
	infiniteQueryOptions,
	useSuspenseInfiniteQuery,
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

export { useGetQuizzes };
export { getQuizzesOpts };
