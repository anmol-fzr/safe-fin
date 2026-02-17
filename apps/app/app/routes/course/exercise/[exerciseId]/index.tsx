import { Screen } from "@/components";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { Exercise } from "@/modules/exercise/components/Exercise";
import { useExerciseQuestionResultSheet } from "@/modules/exercise/components/ExerciseQuestionResultSheet";
import { useExerciseRender } from "@/modules/exercise/components/ExerciseRender";
import { useQuestion } from "@/modules/exercise/components/Question";
import { useGetExercise } from "@/modules/exercise/hooks/queries";
import { useExerciseStore } from "@/modules/exercise/store";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { runOnJS } from "react-native-worklets";
import z from "zod";

const schema = z.object({
	exerciseId: z.coerce.number(),
});

const useExerciseScreenParams = () => {
	return useTypedLocalSearchParams(schema);
};

const { resetStore, setupStore, updateResults } = useExerciseStore.getState();

export default function ExerciseScreen() {
	const params = useExerciseScreenParams();
	const { exerciseId } = params;

	const { exercise } = useGetExercise(exerciseId);

	useLayoutEffect(() => {
		console.info("Reseting Store");
		console.info("Setting Up Store for: ", exerciseId);
		resetStore();
		setupStore({
			exerciseId,
			questionsLen: exercise.questions.length,
		});
	}, [exerciseId]);

	useSetScreenOptions({
		title: exercise.chapter.course.content.title,
	});

	const { selectedOptionIndex, handleOptnPress } = useQuestion();
	const { questions } = exercise;

	const { currQuestionIndex, handleNextQuestion } = useExerciseRender({
		questionsLen: questions.length - 1,
	});

	const question = questions[currQuestionIndex];
	const exerciseQuestionResultSheet = useExerciseQuestionResultSheet();

	interface HandleOptionPress {
		optionIndex: number;
		questionId: number;
		optionId: number;
		answerId: number;
	}

	const handleOptionPress = (payload: HandleOptionPress) => {
		const { optionIndex, questionId, optionId, answerId } = payload;
		handleOptnPress(optionIndex);
		exerciseQuestionResultSheet.present();
		updateResults({
			questionId,
			selectedOptionId: optionId,
			answerId,
		});
	};

	const router = useRouter();

	const handleContinuePress = () => {
		if (currQuestionIndex === questions.length - 1) {
			router.navigate({
				pathname: "/course/exercise/[exerciseId]/result",
				params: {
					exerciseId,
				},
			});
		} else {
			exerciseQuestionResultSheet.dismiss();
			handleNextQuestion();
			handleOptnPress(-1);
		}
	};

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={{ flex: 1 }}
			safeAreaEdges={["bottom"]}
		>
			<Exercise>
				<Exercise.Question question={question.question} />
				<Exercise.Options>
					{question.options.map((option, index) => (
						<Exercise.Option
							key={option.id}
							isActive={selectedOptionIndex === index}
							text={option.value}
							onPress={() => {
								runOnJS(handleOptionPress)({
									optionId: option.id,
									optionIndex: index,
									questionId: question.id,
									answerId: question.answer.id,
								});
							}}
						/>
					))}
				</Exercise.Options>
				<Exercise.QuestionResponseSheet
					handleNextQuestion={handleContinuePress}
					isCorrect={
						questions?.[currQuestionIndex]?.answer.id ===
						questions?.[currQuestionIndex]?.options[selectedOptionIndex]?.id
					}
					reason={questions?.[currQuestionIndex]?.reason}
				/>
			</Exercise>
		</Screen>
	);
}

const useSetScreenOptions = (opts: Partial<{}>) => {
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions(opts);
	}, []);
};
