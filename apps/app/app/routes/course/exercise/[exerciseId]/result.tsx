import { ListView, Screen, Text } from "@/components";
import { Section } from "@/components/Section";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { useProgresFromBoolean } from "@/hooks/reanimated";
import { useGetExerciseResult } from "@/modules/exercise/hooks/queries";
import { colors, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { formatDate, isNull } from "@safe-fin/utils";
import { at } from "node_modules/@faker-js/faker/dist/airline-CWrCIUHH";
import { useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeInLeft,
	FadeInRight,
	FadeOutLeft,
	FadingTransition,
	interpolate,
	interpolateColor,
	LinearTransition,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import z from "zod";
import { Exercise } from "@/modules/exercise/components/Exercise";

const formatAttemptDate = (date: string) => {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(date));
};

const paramSchema = z.object({
	exerciseId: z.coerce.number(),
});

const useExerciseResultScreenParams = () => {
	return useTypedLocalSearchParams(paramSchema);
};

export default function ExerciseResultScreen() {
	const { exerciseId } = useExerciseResultScreenParams();
	const [currResultIdx, setCurrResultIdx] = useState(0);

	const { attempts } = useGetExerciseResult(exerciseId);

	const currAttempt = attempts[currResultIdx].result;

	const [currQuestionId, setCurrQuestionId] = useState<number | null>(null);
	const questionResult = useSharedValue(0);

	const handleResultPress = () => {
		questionResult.value = withSpring(1);
	};

	const currQuestion = isNull(currQuestionId)
		? null
		: currAttempt.questions?.[currQuestionId];

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={{ flex: 1 }}
			safeAreaEdges={["bottom"]}
		>
			<Text preset="subheading">Lets Review your Moves</Text>
			<View style={{ flex: 1 }}>
				<View
					style={{
						gap: 4,
						marginInline: "auto",
						flexDirection: "row",
						flexWrap: "wrap",
						padding: spacing.md,
					}}
				>
					{currAttempt.questions.map((result, index) => (
						<Pressable
							onPress={() => {
								setCurrQuestionId((curr) => (curr === index ? null : index));
								handleResultPress();
							}}
							key={index}
						>
							<QuestionResult
								currQuestionId={index}
								questionId={result.id}
								isCorrect={
									result.selectedOptionId === result.question.answer.id
								}
							/>
						</Pressable>
					))}
				</View>
				<Animated.View layout={LinearTransition}>
					{currQuestion !== null ? (
						<Animated.View
							entering={FadeInRight}
							exiting={FadeOutLeft}
							key={currQuestionId}
						>
							<Exercise>
								<Exercise.Question question={currQuestion?.question.question} />
								<Exercise.Options>
									{currQuestion?.question.options.map((option, index) => {
										const { selectedOptionId } = currQuestion;
										const answerId = currQuestion.question.answer.id;

										return (
											<Exercise.Option
												entering={FadeInRight.delay(50 * index)}
												exiting={FadeOutLeft.delay(40 * index)}
												key={option.id}
												text={option.value}
												style={{
													backgroundColor:
														selectedOptionId === option.id
															? selectedOptionId === answerId
																? colors.successBackground
																: colors.errorBackground
															: undefined,
													borderColor:
														selectedOptionId === option.id
															? selectedOptionId === answerId
																? colors.success
																: colors.error
															: colors.palette.neutral300,
												}}
											/>
										);
									})}
								</Exercise.Options>
							</Exercise>
						</Animated.View>
					) : (
						<Text
							style={{ textAlign: "center", width: "80%", margin: "auto" }}
							entering={FadeInDown}
							exiting={FadeOutLeft}
						>
							Tap a question to see what you chose and what the correct answer
							was.
						</Text>
					)}
				</Animated.View>
			</View>

			<Section>
				<Section.Title>Other Attempts</Section.Title>
				<Section.Body>
					{attempts.map((item, index) => (
						<Pressable
							key={item.result.id.toString()}
							onPress={() => {
								setCurrResultIdx(index);
							}}
						>
							<Animated.View
								style={{
									padding: spacing.xs,
									backgroundColor:
										currResultIdx === index
											? colors.palette.neutral200
											: undefined,
								}}
							>
								<Text>{formatAttemptDate(item.result.createdAt)}</Text>
							</Animated.View>
						</Pressable>
					))}
				</Section.Body>
			</Section>
		</Screen>
	);
}

interface QuestionResultProps {
	questionId: number;
	currQuestionId: number | null;
	isCorrect: boolean;
}

const QuestionResult = (props: QuestionResultProps) => {
	const { currQuestionId, questionId, isCorrect } = props;

	const isActive = useProgresFromBoolean(currQuestionId === questionId);

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const styles = useAnimatedStyle(() => ({
		borderRadius: interpolate(isActive.value, [0, 1], [spacing.xs, spacing.sm]),
		borderWidth: 1,
		borderColor: interpolateColor(
			isActive.value,
			[0, 1],
			[
				isCorrect ? colors.successBackground : colors.errorBackground,
				isCorrect ? colors.success : colors.error,
			],
		),
	}));

	return (
		<Animated.View
			style={[
				styles,
				{
					aspectRatio: 1,
					height: 36,
					backgroundColor: isCorrect
						? colors.successBackground
						: colors.errorBackground,
				},
			]}
		></Animated.View>
	);
};
