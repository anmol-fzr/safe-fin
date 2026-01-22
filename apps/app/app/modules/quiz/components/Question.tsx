import { createContext, memo, use, useCallback, useState } from "react";
import type { StyleProp, TextStyle } from "react-native";
import { Pressable, View } from "react-native";
import { Text } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Question as IQuestion } from "../api";
import { useSafeContext } from "@safe-fin/ui/hooks";

type QuestionContext = ReturnType<typeof useQuestion> & {
	question: IQuestion;
};

const questionContext = createContext<QuestionContext | null>(null);

const useQuestionContext = () => {
	return useSafeContext(questionContext, "useQuestionContext");
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

type QuestionProps = {
	question: string;
};

const Question = memo(({ question }: QuestionProps) => {
	return <Text style={{ marginLeft: 8 }}>{question}</Text>;
});

type OptionProps = {
	value: string;
	isActive?: boolean;
	onPress?: () => void;
	style?: StyleProp<TextStyle>;
	textStyle?: StyleProp<TextStyle>;
};

const Option = memo(
	({ isActive = false, value, onPress, style, textStyle }: OptionProps) => {
		const { theme } = useAppTheme();

		const { primary200, neutral100 } = theme.colors.palette;

		return (
			<Pressable
				style={[
					{
						minHeight: 0,
						padding: 12,
						backgroundColor: isActive ? primary200 : neutral100,
						borderRadius: theme.spacing.xs,
					},
					style,
				]}
				onPress={onPress}
			>
				<Text style={textStyle}>{value}</Text>
			</Pressable>
		);
	},
);

const Options = memo(() => {
	const { question, opIndx, handleOptnPress } = useQuestionContext();

	return (
		<View style={{ gap: 4 }}>
			{question.options.map((option, indx) => (
				<Option
					key={option.id}
					isActive={opIndx === indx}
					value={option.value}
					onPress={() => handleOptnPress(indx)}
				/>
			))}
		</View>
	);
});

// const Countdown = () => <Text>{countdown}</Text>;
//
// const Wrapper = () => {
// 	const { question } = useQuestionContext();
// 	return (
// 		<View style={styles.quesWrapper}>
// 			<Question question={question.question} />
// 			<Countdown />
// 		</View>
// 	);
// };
//
// const styles = StyleSheet.create({
// 	quesWrapper: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 	},
// });

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
