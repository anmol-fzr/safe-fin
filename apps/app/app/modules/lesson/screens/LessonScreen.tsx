import { Link } from "@react-navigation/native";
import { View } from "react-native";
import Markdown from "react-native-markdown-display";
import {
	$fontWeightStyles,
	$sizeStyles,
	GoBack,
	Screen,
	Text,
} from "@/components";
import { $styles, spacing } from "@/theme";
import { MissingRouteParamError } from "@/utils/error";
import { useGetLesson } from "../hooks/api";
import type { LessonStackScreenProps } from "../navigator";

type LessonScreenProps = LessonStackScreenProps<"Lesson">;

export function LessonScreen(props: LessonScreenProps) {
	const { lessonId } = props.route.params;
	if (!lessonId) {
		throw new MissingRouteParamError("lessonId", "LessonScreen");
	}

	// const { isPending, lessons } = useGetLesson(lessonId);
	//
	// const quizzes = lessons.pages[0]?.data ?? [];

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="lessonScreen:title" />
			{true ? (
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
												borderColor: "black",
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
