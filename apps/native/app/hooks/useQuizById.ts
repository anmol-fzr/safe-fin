import { useQuery, queryOptions } from "@tanstack/react-query";
import { API } from "@/services/api";

const getQuizByIdOptions = (quizId: number) => {
	return queryOptions({
		queryKey: ["QUIZ", quizId],
		queryFn: () => API.QUIZ.ONE(quizId),
	});
};

const useQuizById = (quizId: number) => {
	const query = useQuery(getQuizByIdOptions(quizId));

	return query;
};

export { useQuizById, getQuizByIdOptions };
