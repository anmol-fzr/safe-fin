import { Question } from "@/services/api/quiz";
import { MissingContextError } from "@/utils/error";
import { useState, useCallback, useContext, createContext } from "react";

type QuestionContext = ReturnType<typeof useQuestion> & {
	question: Question;
};

const questionContext = createContext<QuestionContext | null>(null);

const useQuestionContext = () => {
	const ctx = useContext(questionContext);
	if (ctx === null || ctx === undefined) {
		throw new MissingContextError("useQuestionContext", "QuestionProvider");
	}
	return ctx;
};

const useQuestion = () => {
	const [opIndx, setOpIndx] = useState(-1);

	const resetOptn = useCallback(() => {
		setOpIndx(-1);
	}, []);

	const handleOptnPress = useCallback((opt: number) => {
		setOpIndx(opt);
	}, []);

	return { opIndx, handleOptnPress, resetOptn };
};

const QuestionProvider = questionContext.Provider;

export { QuestionProvider, useQuestionContext, useQuestion };
