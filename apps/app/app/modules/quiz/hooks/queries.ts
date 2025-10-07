import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { QUIZ } from "../api";

const baseQueryKey = "QUIZ";

function getQuizOpts(quizId: number) {
	return queryOptions({
		queryKey: [baseQueryKey, quizId],
		queryFn: () => QUIZ.ONE(quizId),
	});
}

const useGetQuiz = (quizId: number) => {
	const opts = getQuizOpts(quizId);
	const { data, ...rest } = useSuspenseQuery(opts);
	return { quiz: data.data, ...rest };
};

export { useGetQuiz };
