import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Progress } from "tamagui";
import { useCountdown } from "@/hooks";
import { useCounter } from "@/hooks/useCounter";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { API } from "@/services/api";
import type { IQuizResult } from "@/services/api/quiz-result";
import { spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Button } from "../Button";
import { Text } from "../Text";
import { Question } from "./Question";
import { QuestionProvider, useQuestion } from "./QuestionContext";
import { useQuizContext } from "./QuizContext";

export type ResultRecord = Record<string, number>;

export const QuizRender = () => {
	const { opIndx, handleOptnPress, resetOptn } = useQuestion();

	const { questions, id: quizId } = useQuizContext();
	const { countdown, reset, restart } = useCountdown();

	const max = questions.length - 1;

	const { counter, onNext, isLast } = useCounter({
		max,
	});

	const { mutate } = useMutation({
		mutationFn: API.QUIZ.RESULT.SAVE,
	});

	useEffect(() => {
		restart();
	}, [restart]);

	useEffect(() => {
		if (countdown === 0) {
			goToNextQues();
		}
	}, [countdown]);

	const [userAnswers, setUserAnswers] = useState<ResultRecord>({});

	const { goBack, push } = useSafeNavigation();

	useEffect(() => {
		if (countdown === 1) {
			if (isLast) {
				goBack();
				return;
			}
			onNext();
			resetOptn();
			reset();
		}
	}, [countdown, onNext, resetOptn, reset]);

	const goToNextQues = useCallback(() => {
		resetOptn();
		onNext();
	}, [resetOptn, onNext]);

	const handleSkipQues = useCallback(goToNextQues, [goToNextQues]);

	const currQuestion = questions[counter];

	const handleNextQues = () => {
		const currAnswers = { ...userAnswers };
		currAnswers[currQuestion.id.toString()] = currQuestion.options[opIndx].id;
		setUserAnswers(currAnswers);

		goToNextQues();
	};

	const handleSave = useCallback(async () => {
		handleNextQues();

		if (isLast) {
			const results: IQuizResult[] = [];

			Object.entries(userAnswers).map(([key, value]) => {
				results.push({
					questionId: Number(key),
					answeredId: value,
				});
			});

			mutate({
				answers: userAnswers,
				quizId: quizId,
			});

			push("Quiz", {
				screen: "QuizResult",
				// params: {
				// 	answers: userAnswers,
				// 	quizId: quizId,
				// },
			});
		}
	}, [handleNextQues, isLast, userAnswers, quizId]);

	return (
		<View>
			<View style={{ gap: 12 }}>
				<Text weight="medium">
					Question {counter + 1} of {questions.length}
				</Text>
				<QuestionProvider
					value={{
						opIndx,
						handleOptnPress,
						resetOptn,
						question: currQuestion,
					}}
				>
					<View style={styles.quesWrapper}>
						<Question.Question question={currQuestion.question} />
						<Text>{countdown}</Text>
					</View>
					<QuizTimeProgress countdown={countdown} />
					<Question.Options />
				</QuestionProvider>

				<View style={styles.buttonWrapper}>
					{!isLast && (
						<Button
							disabled={opIndx !== -1}
							onPress={handleSkipQues}
							text="Skip Question"
							style={styles.skipBtn}
						/>
					)}
					<Button
						onPress={handleSave}
						disabled={opIndx === -1}
						text="Save"
						preset="reversed"
						style={styles.saveBtn}
					/>
				</View>
			</View>
		</View>
	);
};

const QuizTimeProgress = ({ countdown }: { countdown: number }) => {
	const { theme } = useAppTheme();
	return (
		<Progress
			value={Math.min(100, Math.max(0, Math.round((countdown * 10) / 3)))}
			height={4}
			backgroundColor={theme.colors.tintInactive}
		>
			<Progress.Indicator
				animation="lazy"
				backgroundColor={theme.colors.tint}
			/>
		</Progress>
	);
};

const styles = StyleSheet.create({
	buttonWrapper: {
		display: "flex",
		flexDirection: "row",
		gap: spacing.md,
		marginTop: spacing.md,
		justifyContent: "space-between",
	},
	skipBtn: { flexGrow: 0.75 },
	saveBtn: { flexGrow: 1 },
	quesWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
