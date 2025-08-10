import { memo } from "react";
import { Pressable, View } from "react-native";
import type { TextStyle, StyleProp } from "react-native";
import { Text } from "../Text";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Option as IOption } from "@/services/api/quiz";
import { useQuestionContext } from "./QuestionContext";

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

export { question as Question };
