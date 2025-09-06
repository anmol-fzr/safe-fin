import { Screen, ScreenHeader, GoBack, Text } from "@/components";
import { $styles, spacing } from "@/theme";
import Markdown from "react-native-markdown-display";
import { $sizeStyles, $fontWeightStyles } from "@/components";
import type { ScreenProps } from "@/navigators";
import { MissingRouteParamError } from "@/utils/error";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { View } from "react-native";
import { Link } from "@react-navigation/native";

type LessonScreenProps = ScreenProps<"Lesson">;

export function LessonScreen(props: LessonScreenProps) {
	const lessonId = props.route.params?.lessonId;
	const { isPending, data } = useQuery({
		queryKey: ["LESSON", lessonId],
		queryFn: () => API.LESSON.ONE(lessonId),
		enabled: !!lessonId,
	});

	if (!lessonId) {
		throw new MissingRouteParamError("lessonId", "LessonScreen");
	}

	const quizzes = data?.data?.quizzes ?? [];

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="lessonScreen:title" />
			{isPending ? (
				<Text>Loading</Text>
			) : (
				<>
					<Markdown
						style={{
							paragraph: {
								fontFamily: "spaceGroteskRegular",
							},
							strong: {
								fontFamily: "spaceGroteskRegular",
							},
							heading1: {
								...$sizeStyles.xl,
								...$fontWeightStyles.bold,
							},
							heading2: {
								...$sizeStyles.lg,
								...$fontWeightStyles.semiBold,
								marginTop: spacing.xs,
								marginBottom: spacing.xxs,
							},
							heading3: {
								...$sizeStyles.md,
								...$fontWeightStyles.bold,
								marginTop: spacing.xxs,
								marginBottom: spacing.xxxs,
							},
							hr: {
								marginBlock: spacing.md,
							},
							blockquote: {
								marginBlock: spacing.md,
							},
						}}
					>
						{data.data.content}
					</Markdown>

					{quizzes.length > 0 ? (
						<View>
							<Text preset="subheading">Test you knowledge with a Quiz</Text>
							<View>
								{quizzes.map((quiz) => (
									<Link
										screen="Quiz"
										params={{ quizId: quiz.id }}
										key={quiz.id}
									>
										<View
											style={{
												width: "50%",
												aspectRatio: 1.5,
												border: "black",
												borderWidth: 1,
												borderRadius: spacing.md,
												padding: spacing.sm,
											}}
										>
											<Text>{quiz.quiz.title}</Text>
										</View>
									</Link>
								))}
							</View>
						</View>
					) : (
						<></>
					)}
				</>
			)}

			{}
		</Screen>
	);
}
