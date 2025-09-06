import { memo } from "react";
import { type TextStyle } from "react-native";
import { Screen, Text, GoBack, Button } from "@/components";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { ScreenProps } from "@/navigators";
import { QuizProvider } from "@/components/quiz/QuizContext";
import { QuizRender } from "@/components/quiz/QuizRender";
import { useQuizById } from "@/hooks/useQuizById";
import { useToggle } from "@/hooks";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

type QuizScreenProps = ScreenProps<"Quiz">;

export function QuizScreen(props: QuizScreenProps) {
	const quizId = props.route.params?.quizId;
	const { isOpen: isStarted, onOpen: handleQuizStart } = useToggle();

	if (!quizId) {
		throw new Error("No quizId param passed on QuizScreen");
	}

	const { themed } = useAppTheme();

	const { data, isPending } = useQuizById(quizId);
	const quizData = data?.data;

	//const toResults = () => props.navigation.navigate("QuizResult");

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="quizzesScreen:title" />
			{isPending ? (
				<LoadingQuiz />
			) : (
				<>
					<Text preset="heading" style={$title}>
						{quizData?.title}
					</Text>
					<Text style={themed($tagline)}>{quizData?.desc}</Text>

					{isStarted ? (
						<QuizProvider value={quizData}>
							<QuizRender />
						</QuizProvider>
					) : (
						<Button text="Start Quiz" onPress={handleQuizStart} />
					)}
				</>
			)}
			{/* <Button text="Results" onPress={toResults} /> */}
		</Screen>
	);
}

const LoadingQuiz = memo(() => (
	<SkeletonPlaceholder>
		<SkeletonPlaceholder.Item
			width={280}
			height={36}
			borderRadius={5}
			marginTop={12}
			marginBottom={8}
		/>
		<SkeletonPlaceholder.Item
			width="auto"
			height={20}
			borderRadius={5}
			marginBottom={5}
		/>
		<SkeletonPlaceholder.Item
			width="90%"
			height={20}
			borderRadius={5}
			marginBottom={6}
		/>
	</SkeletonPlaceholder>
));
const $title = {
	fontSize: 24,
};

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xxl,
});
