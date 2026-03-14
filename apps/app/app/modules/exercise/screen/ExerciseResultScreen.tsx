import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { Button, Screen, Text } from "@/components";
import { $styles, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Question } from "../components/Question";
import { useGetExercise } from "../hooks/queries";

// const markans = {
// 	"1": 1,
// 	"2": 6,
// 	"3": 10,
// 	"4": 15,
// 	"5": 17,
// 	"6": 21,
// 	"7": 28,
// 	"8": 31,
// 	"9": 35,
// } as const;
//
// const empty = [];
//
// Object.entries(markans).map(([key, value]) => {
// 	empty.push({
// 		questionId: Number(key),
// 		answeredId: value,
// 	});
// });

export function ExerciseResultScreen() {
	//const markedAnswers = props.route.params?.answers;
	// const exerciseId = props.route.params?.exerciseId;
	const [activeQuesId, setActiveQuesId] = useState("");
	const markedAnswers = {
		"1": 1,
		"2": 6,
		"3": 10,
		"4": 15,
		"5": 17,
		"6": 21,
		"7": 28,
		"8": 31,
		"9": 35,
	} as const;
	const exerciseId = 1;

	if (!markedAnswers) {
		throw new Error("No Answers array param passed on ExerciseScreen");
	}
	if (!exerciseId) {
		throw new Error("No ExerciseId array param passed on ExerciseScreen");
	}
	const router = useRouter();

	const { exercise, isPending } = useGetExercise(exerciseId);

	const activeQues = exercise.questions?.find(
		(ques) => ques.id.toString() === activeQuesId,
	);

	const goToExercises = useCallback(
		() => router.push("/tabs/learnings"),
		[router],
	);

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<View style={styles.screen}>
				<View style={styles.wrapper}>
					{isPending ? (
						<Text>Crunching Results ...</Text>
					) : (
						exercise.questions?.map((question, index) => {
							const isCorrect =
								markedAnswers[question.id.toString()] === question.answerId;
							return (
								<Square
									key={question.id}
									onPress={() =>
										setActiveQuesId((curr) =>
											curr === question.id.toString()
												? ""
												: question.id.toString(),
										)
									}
									isActive={activeQuesId === question.id.toString()}
									isCorrect={isCorrect}
									index={index}
								/>
							);
						})
					)}
				</View>
				{!activeQuesId ? (
					<View style={{ width: "100%", gap: 12 }}>
						<Text preset="formHelper" size="xs" style={{ textAlign: "center" }}>
							Click on Question Number to see mistake / correct answer
						</Text>
						<Button
							preset="text"
							textStyle={{ textDecorationLine: "underline" }}
							onPress={goToExercises}
						>
							More Exercises
						</Button>
					</View>
				) : (
					<View style={{ width: "100%" }}>
						<Question.Question question={activeQues?.question} />
						<View style={{ gap: 4, marginTop: 8 }}>
							{activeQues?.options.map((option) => (
								<Question.Option key={option.id} value={option.value} />
							))}
						</View>
					</View>
				)}
			</View>

			{/*
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 36,
					marginBlock: 24,
				}}
			>
				{data?.questions.map((question) => (
					<View
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 4,
						}}
					>
						<Question.Question question={question.question} />
						<View
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 4,
							}}
						>
							{question.options.map((option) => {
								return (
									<Question.Option
										value={option.value}
										style={{
											backgroundColor:
												answers[question.id] === option.id
													? "green"
													: undefined,
										}}
										textStyle={{
											color:
												answers[question.id] === option.id
													? colors.error
													: colors.text,
										}}
									/>
								);
							})}
						</View>
					</View>
				))}
			</View>
      */}
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: {
		display: "flex",
		gap: 20,
	},
	wrapper: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 4,
		alignItems: "center",
		justifyContent: "center",
		//marginTop: 24,
	},
});
//() => setActiveQuesId(question.id.toString())
type SquareProps = {
	isActive: boolean;
	isCorrect: boolean;
	onPress: VoidFunction;
	index: number;
};
const Square = ({ isActive, isCorrect, onPress, index }: SquareProps) => {
	const {
		theme: { colors },
	} = useAppTheme();

	//const isActive = activeQuesId === question.id.toString();

	const borderRadius = useSharedValue<number>(spacing.xs);

	useEffect(() => {
		borderRadius.value = withTiming(isActive ? spacing.xl : spacing.xs, {
			duration: 200,
		});
	}, [isActive, borderRadius]);

	const animatedStyle = useAnimatedStyle(() => ({
		borderRadius: borderRadius.value,
	}));

	return (
		<Pressable onPress={onPress}>
			<Animated.View
				style={[
					{
						height: 60,
						aspectRatio: 1,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: isCorrect
							? colors.successBackground
							: colors.errorBackground,
					},
					animatedStyle,
				]}
			>
				<Text
					style={{
						color: isCorrect ? colors.success : colors.error,
					}}
				>
					{index + 1}
				</Text>
			</Animated.View>
		</Pressable>
	);
};
