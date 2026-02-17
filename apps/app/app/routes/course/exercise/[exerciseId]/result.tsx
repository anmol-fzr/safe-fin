import { Text } from "@/components";
import { Section } from "@/components/Section";
import { useProgresFromBoolean } from "@/hooks/reanimated";
import {
	useGetExerciseResult,
	usePrefetchExerciseResult,
} from "@/modules/exercise/hooks/queries";
import { useAppTheme } from "@/utils/useAppTheme";
import { isNull } from "@/pkg/utils";
import { makeSpringy } from "@/theme";
import { Suspense, useCallback, useEffect, useState } from "react";
import { BackHandler, Pressable, View } from "react-native";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeInRight,
	FadeOutLeft,
	interpolate,
	interpolateColor,
	LinearTransition,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import z from "zod";
import { Exercise } from "@/modules/exercise/components/Exercise";
import { useExerciseStore } from "@/modules/exercise/store";
import { useSaveExerciseResult } from "@/modules/exercise/hooks/mutations";
import { createRoute } from "@/factory/route";
import { idSchema } from "@/schema";
import { ExerciseResultLoading } from "@/modules/exercise/components/result";
import { useFocusEffect, useRouter } from "expo-router";

const formatAttemptDate = (date: string) => {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(date));
};

const Route = createRoute({
	paramSchema: z.object({
		exerciseId: idSchema,
	}),
});

export default function ExerciseResultScreen() {
	const { exerciseId } = Route.useParams();

	const storedExerciseResult = useExerciseStore((s) => s.results);
	const storedExerciseId = useExerciseStore((s) => s.exerciseId);
	const resetStore = useExerciseStore((s) => s.resetStore);

	const { saveExerciseResultAsync } = useSaveExerciseResult();
	const { prefetchExerciseResult } = usePrefetchExerciseResult();

	const shouldSubmit =
		storedExerciseId !== null && storedExerciseId === exerciseId;

	const [submissionDone, setSubmissionDone] = useState(!shouldSubmit);

	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				router.navigate("/tabs/learnings");

				return true;
			};

			const subscription = BackHandler.addEventListener(
				"hardwareBackPress",
				onBackPress,
			);

			return () => subscription.remove();
		}, []),
	);

	useEffect(() => {
		if (!shouldSubmit) return;

		let cancelled = false;

		async function run() {
			try {
				const results = Object.values(storedExerciseResult);

				await saveExerciseResultAsync({
					exerciseId,
					results,
				});

				if (cancelled) return;

				resetStore();
				await prefetchExerciseResult(exerciseId);

				if (cancelled) return;

				resetStore();
				setSubmissionDone(true);
			} catch (err) {
				// TODO: handle error state if needed
				setSubmissionDone(true);
			}
		}

		run();

		return () => {
			cancelled = true;
		};
	}, [shouldSubmit]);

	const canMountResult = submissionDone;

	if (!canMountResult) {
		return <EvaluatingState />;
	}

	return (
		<Suspense fallback={<EvaluatingState />}>
			<ResultState exerciseId={exerciseId} />
		</Suspense>
	);
}

function EvaluatingState() {
	return (
		<Route.Screen>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					height: "100%",
				}}
			>
				<ExerciseResultLoading />
			</View>
		</Route.Screen>
	);
}

interface ResultStateProps {
	exerciseId: number;
}

function ResultState(props: ResultStateProps) {
	const { exerciseId } = props;

	const [currResultIdx, setCurrResultIdx] = useState(0);

	const { attempts } = useGetExerciseResult(exerciseId);

	const currAttempt = attempts[currResultIdx].result;

	const [currQuestionIdx, setCurrQuestionIdx] = useState<number | null>(null);
	const questionResult = useSharedValue(0);

	const handleResultPress = () => {
		questionResult.value = withSpring(1);
	};

	const currQuestion = isNull(currQuestionIdx)
		? null
		: currAttempt.questions?.[currQuestionIdx];

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	return (
		<Route.Screen safeAreaEdges={["top", "bottom"]}>
			<Text preset="subheading" style={{ textAlign: "center" }}>
				Lets Review your Moves
			</Text>
			<View style={{ flex: 1 }}>
				<View
					style={{
						gap: 4,
						marginInline: "auto",
						flexDirection: "row",
						flexWrap: "wrap",
						padding: spacing.md,
						alignItems: "center",
					}}
				>
					{currAttempt.questions.map((result, index) => (
						<Pressable
							onPress={() => {
								setCurrQuestionIdx((curr) => (curr === index ? null : index));
								handleResultPress();
							}}
							key={index}
						>
							<QuestionResult
								currQuestionId={currQuestionIdx}
								questionId={index}
								isCorrect={
									result.selectedOptionId === result.question.answer.id
								}
								index={index}
							/>
						</Pressable>
					))}
				</View>
				<Animated.View layout={LinearTransition}>
					{currQuestion !== null ? (
						<Animated.View
							entering={makeSpringy(FadeInRight)}
							exiting={makeSpringy(FadeOutLeft)}
							key={currQuestionIdx}
						>
							<Exercise>
								<Exercise.Question question={currQuestion?.question.question} />
								<Exercise.Options>
									{currQuestion?.question.options.map((option, index) => {
										const { selectedOptionId } = currQuestion;
										const answerId = currQuestion.question.answer.id;

										const isMarked = option.id === selectedOptionId;
										const isCorrect = answerId === option.id;

										let prefix = "";
										if (isCorrect) {
											prefix = "Correct: ";
										}
										if (isMarked && !isCorrect) {
											prefix = "You Chose: ";
										}

										let backgroundColor = undefined;
										let borderColor: string = colors.palette.neutral300;

										if (isCorrect) {
											backgroundColor = colors.successBackground;
											borderColor = colors.success;
										}
										if (isMarked && !isCorrect) {
											backgroundColor = colors.errorBackground;
											borderColor = colors.error;
										}

										return (
											<Exercise.Option
												entering={makeSpringy(FadeInRight).delay(50 * index)}
												exiting={makeSpringy(FadeOutLeft).delay(40 * index)}
												key={option.id}
												text={`${prefix} ${option.value}`}
												style={{
													backgroundColor,
													borderColor,
												}}
											/>
										);
									})}
								</Exercise.Options>
								<Exercise.Reason>
									{currQuestion.question.reason}
								</Exercise.Reason>
							</Exercise>
						</Animated.View>
					) : (
						<Text
							style={{ textAlign: "center", width: "80%", margin: "auto" }}
							entering={makeSpringy(FadeInDown)}
							exiting={makeSpringy(FadeOutLeft)}
						>
							Tap any question to reveal what you selected and what was correct.
						</Text>
					)}
				</Animated.View>
			</View>

			{attempts.length > 1 && (
				<Section>
					<Section.Title>Other Attempts</Section.Title>
					<Section.Body>
						{attempts.map((item, index) => (
							<Pressable
								key={item.result.id.toString()}
								onPress={() => {
									setCurrResultIdx(index);
									setCurrQuestionIdx(0);
								}}
							>
								<Animated.View
									style={{
										padding: spacing.xs,
										paddingInline: spacing.md,
										borderRadius: spacing.xs,
										backgroundColor:
											currResultIdx === index ? colors.text : undefined,
									}}
								>
									<Text
										style={{
											color:
												currResultIdx === index
													? colors.textInverse
													: undefined,
										}}
									>
										{formatAttemptDate(item.result.createdAt)}
									</Text>
								</Animated.View>
							</Pressable>
						))}
					</Section.Body>
				</Section>
			)}
		</Route.Screen>
	);
}

interface QuestionResultProps {
	questionId: number;
	currQuestionId: number | null;
	isCorrect: boolean;
	index: number;
}

const QuestionResult = (props: QuestionResultProps) => {
	const { currQuestionId, questionId, isCorrect, index } = props;

	const isActive = useProgresFromBoolean(currQuestionId === questionId);

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const styles = useAnimatedStyle(() => ({
		borderWidth: 1,
		borderRadius: interpolate(isActive.value, [0, 1], [spacing.xs, spacing.sm]),

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
			entering={FadeIn.delay(75 * index)}
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
