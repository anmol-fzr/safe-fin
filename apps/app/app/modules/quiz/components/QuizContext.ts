import { createContext, useContext } from "react";
import { MissingContextError } from "@/utils/error";
import type { Quiz } from "../api";

const quizContext = createContext<Quiz | null>(null);

const useQuizContext = () => {
	const ctx = useContext(quizContext);
	if (ctx === null || ctx === undefined) {
		throw new MissingContextError("useQuizContext", "QuizProvider");
	}
	return ctx;
};
const QuizProvider = quizContext.Provider;

export { QuizProvider, useQuizContext };
