import { createContext } from "react";
import type { Quiz } from "../api";
import { useSafeContext } from "@safe-fin/ui/hooks";

const quizContext = createContext<Quiz | null>(null);

const useQuizContext = () => {
	return useSafeContext(quizContext, "useQuizContext");
};

const QuizProvider = quizContext.Provider;

export { QuizProvider, useQuizContext };
