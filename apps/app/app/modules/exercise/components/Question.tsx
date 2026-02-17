import { createContext, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";
import { Question as IQuestion } from "../api";
import { useSafeContext } from "@safe-fin/ui/hooks";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-worklets";
import { useExerciseQuestionResultSheet } from "./ExerciseQuestionResultSheet";
import * as Haptics from "expo-haptics";

type QuestionContext = ReturnType<typeof useQuestion> & {
	question: IQuestion;
};

const questionContext = createContext<QuestionContext | null>(null);

const useQuestionContext = () => {
	return useSafeContext(questionContext, "useQuestionContext");
};

const useQuestion = () => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

	const handleOptnPress = useCallback((id: number) => {
		setSelectedOptionIndex(id);
	}, []);

	return { selectedOptionIndex, handleOptnPress };
};

const QuestionProvider = questionContext.Provider;

const Question = () => {
	const { question } = useQuestionContext();

	return (
		<Text weight="medium" size="md" style={{ marginLeft: 8 }}>
			{question.question}
		</Text>
	);
};

interface OptionProps {
	value: string;
	isActive: boolean;
	onPress: VoidFunction;
}

const Option = (props: OptionProps) => {
	const { isActive, value, onPress } = props;

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const activeProgress = useSharedValue(isActive ? 1 : 0);
	const pressProgress = useSharedValue(0);

	useEffect(() => {
		activeProgress.value = withSpring(isActive ? 1 : 0, {
			duration: 200,
		});
	}, [isActive]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				activeProgress.value,
				[0, 1],
				[colors.palette.neutral200, colors.palette.primary300],
			),
			borderColor: interpolateColor(
				activeProgress.value,
				[0, 1],
				[colors.palette.neutral300, colors.tint],
			),
			marginTop: pressProgress.value * 4,
			borderBottomWidth: 5 - pressProgress.value * 4,
		};
	});

	const animatedTextStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				activeProgress.value,
				[0, 1],
				[colors.text, colors.palette.neutral100],
			),
		};
	});

	const handlePress = () => {
		Haptics.selectionAsync();
		onPress();
	};

	const tap = Gesture.Tap()
		.onBegin(() => {
			pressProgress.value = withSpring(1, { duration: 200 });
		})
		.onFinalize(() => {
			pressProgress.value = withSpring(0, { duration: 200 });
		})
		.onEnd(() => {
			runOnJS(handlePress)();
		});

	return (
		<GestureDetector gesture={tap}>
			<Animated.View
				style={[
					{
						padding: 12,
						borderRadius: spacing.xs,
						borderWidth: 1,
					},
					animatedStyle,
				]}
			>
				<Text style={animatedTextStyle}>{value}</Text>
			</Animated.View>
		</GestureDetector>
	);
};

const Options = () => {
	const { question, selectedOptionIndex, handleOptnPress } =
		useQuestionContext();

	const {
		theme: { spacing },
	} = useAppTheme();
	const exerciseQuestionResultSheet = useExerciseQuestionResultSheet();

	return (
		<View style={{ gap: spacing.xs }}>
			{question.options.map((question, index) => (
				<Option
					key={question.id}
					isActive={selectedOptionIndex === index}
					value={question.value}
					onPress={() => {
						handleOptnPress(index);
						exerciseQuestionResultSheet.present();
					}}
				/>
			))}
		</View>
	);
};

const question = {
	Question,
	Option,
	Options,
};

export {
	question as Question,
	QuestionProvider,
	useQuestionContext,
	useQuestion,
};
