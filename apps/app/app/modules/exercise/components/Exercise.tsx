import { Text } from "@/components";
import { AnimatedProgressBar } from "@/components/shared/organisms/progress/AnimatedProgress";
import type { ThemedTextStyle, ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { View } from "react-native";
import type { ViewProps } from "react-native";
import type { TextProps } from "@/components";
import { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import {
	GamifiedButton,
	GamifiedButtonProps,
} from "@/components/gamified/GamifiedButton";
import { useProgresFromBoolean } from "@/hooks/reanimated";
import { ExerciseQuestionResultSheet } from "./ExerciseQuestionResultSheet";

export const Exercise = (props: ViewProps) => {
	const { style: $styleOverride, ...rest } = props;
	const { themed } = useAppTheme();

	return <View style={[themed($exerciseRoot), $styleOverride]} {...rest} />;
};
const $exerciseRoot: ThemedViewStyle = (theme) => ({
	padding: theme.spacing.xs,
	gap: theme.spacing.lg,
});

interface ExerciseProgressBarProps extends ViewProps {
	progress: number;
}

Exercise.ProgressBar = (props: ExerciseProgressBarProps) => {
	const { progress, style: $styleOverride, ...rest } = props;

	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<View style={[themed($progressBarRoot), $styleOverride]} {...rest}>
			<AnimatedProgressBar
				progress={progress}
				width="90%"
				progressColor={colors.tint}
				trackColor={colors.palette.accent100}
				borderRadius={12}
			/>
			<Text>{progress * 100}%</Text>
		</View>
	);
};

const $progressBarRoot: ThemedViewStyle = (theme) => ({
	flexDirection: "row",
	gap: theme.spacing.xxs,
	flex: 1,
});

interface ExerciseQuestionProps extends TextProps {
	question: string;
}

Exercise.Question = (props: ExerciseQuestionProps) => {
	const { question, style: $styleOverride, ...rest } = props;

	const { themed } = useAppTheme();

	return (
		<Text
			weight="medium"
			size="md"
			style={[themed($questionText), $styleOverride]}
			{...rest}
		>
			{question}
		</Text>
	);
};

const $questionText: ThemedTextStyle = (theme) => ({
	marginLeft: theme.spacing.xs,
});

interface ExerciseOptionsProps extends ViewProps {}

Exercise.Options = (props: ExerciseOptionsProps) => {
	const { style: $styleOverride, ...rest } = props;

	const { themed } = useAppTheme();

	return <View style={[themed($optionsRoot), $styleOverride]} {...rest} />;
};

const $optionsRoot: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.xxs,
});

interface OptionProps extends GamifiedButtonProps {
	text: string;
}

Exercise.Option = (props: OptionProps) => {
	const { text, ...rest } = props;

	const {
		theme: { colors },
	} = useAppTheme();

	const activeProgress = useProgresFromBoolean(rest.isActive);

	const textStyle = useAnimatedStyle(() => {
		return {
			color: interpolateColor(
				activeProgress.value,
				[0, 1],
				[colors.text, colors.palette.neutral100],
			),
		};
	});

	return (
		<GamifiedButton {...rest}>
			<Text style={textStyle}>{text}</Text>
		</GamifiedButton>
	);
};

interface ReasonProps extends TextProps {
	contentContainerProps?: ViewProps;
}

Exercise.Reason = (props: ReasonProps) => {
	const { contentContainerProps = {}, ...rest } = props;

	const { themed } = useAppTheme();

	const { style: $contentContainerStyleOverride, ...contentContainerRest } =
		contentContainerProps;

	return (
		<View
			style={[themed($reasonRoot), $contentContainerStyleOverride]}
			{...contentContainerRest}
		>
			<Text size="md" weight="medium">
				Why
			</Text>
			<Text {...rest} />
		</View>
	);
};
const $reasonRoot: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.xxs,
});

Exercise.QuestionResponseSheet = ExerciseQuestionResultSheet;
