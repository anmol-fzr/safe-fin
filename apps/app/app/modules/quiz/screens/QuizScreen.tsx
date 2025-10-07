import { memo } from "react";
import type { TextStyle } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Button, GoBack, Screen, Text } from "@/components";
import { useToggle } from "@/hooks";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { QuizProvider } from "../components/QuizContext";
import { QuizRender } from "../components/QuizRender";
import { useGetQuiz } from "../hooks/queries";
import type { QuizStackScreenProps } from "../navigator";

type QuizScreenProps = QuizStackScreenProps<"Quiz">;

export function QuizScreen(props: QuizScreenProps) {
	const { quizId } = props.route.params;

	const { isOpen: isStarted, onOpen: handleQuizStart } = useToggle();

	const { themed } = useAppTheme();

	const { quiz } = useGetQuiz(quizId);

	//const toResults = () => props.navigation.navigate("QuizResult");

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="quizzesScreen:title" />
			<Text preset="heading" style={$title}>
				{quiz?.title}
			</Text>
			<Text style={themed($tagline)}>{quiz?.desc}</Text>

			{isStarted ? (
				<QuizProvider value={quizData}>
					<QuizRender />
				</QuizProvider>
			) : (
				<Button text="Start Quiz" onPress={handleQuizStart} />
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
