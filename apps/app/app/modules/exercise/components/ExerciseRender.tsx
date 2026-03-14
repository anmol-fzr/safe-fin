import { useCounter } from "@/hooks/use-counter";

interface useExerciseRenderProps {
	questionsLen: number;
}

export const useExerciseRender = (props: useExerciseRenderProps) => {
	const { questionsLen } = props;

	const { counter, onNext } = useCounter({
		max: questionsLen,
	});

	const handleNextQuestion = () => {
		onNext();
	};

	return {
		currQuestionIndex: counter,
		handleNextQuestion,
	};
};
