import { memo, useCallback } from "react";
import { StyleSheet, type TextStyle } from "react-native";
import { Screen, Card, LoadingCard, ScreenHeader } from "../components";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { API } from "@/services/api";
import type { Quiz as IQuiz } from "@/services/api/quiz";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { getQuizByIdOptions } from "@/hooks/useQuizById";

const arr = Array(5).fill(0);

export function QuizzesScreen() {
	const { data, isPending } = useQuery({
		queryKey: ["QUIZ"],
		queryFn: API.QUIZ.ALL,
	});

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="quizzesScreen:title"
				tagLineTx="quizzesScreen:tagLine"
			/>

			{isPending ? (
				<LoadingCards />
			) : (
				data?.data?.map((quiz) => <QuizListItem key={quiz.id} {...quiz} />)
			)}
		</Screen>
	);
}

const LoadingCards = memo(() => {
	const { themed } = useAppTheme();

	return arr.map((_, i) => <LoadingCard key={i} style={themed($card)} />);
});

type QuizListItemProps = IQuiz;

const QuizListItem = memo(({ id, title, desc }: QuizListItemProps) => {
	const { themed } = useAppTheme();
	const queryClient = useQueryClient();
	const navigation = useNavigation();

	const goToQuiz = useCallback(() => {
		queryClient.prefetchQuery(getQuizByIdOptions(id));
		navigation.navigate("Quiz", { quizId: id });
	}, [id]);

	return (
		<Card
			heading={title}
			headingStyle={styles.heading}
			content={desc}
			onPress={goToQuiz}
			style={themed($card)}
		/>
	);
});

const $card: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xs,
	padding: spacing.sm,
});

const styles = StyleSheet.create({
	heading: {
		textTransform: "capitalize",
	},
});
