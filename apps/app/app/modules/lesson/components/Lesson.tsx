import { getEmptyArr } from "@safe-fin/ui/utils";
import {
	Share as Share2Icon,
	Dislike as ThumbsDownIcon,
	Like1 as ThumbsUpIcon,
} from "iconsax-react-nativejs";
import { Suspense, useMemo } from "react";
import { View } from "react-native";
import {
	EnrichedMarkdownText,
	EnrichedMarkdownTextProps,
} from "react-native-enriched-markdown";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { $sizeStyles } from "@/components";
import { useDimensions } from "@/hooks/use-dimensions";
import type { ResourceId } from "@/types";
import { useAppTheme } from "@/utils/useAppTheme";
import { useGetLesson } from "../hooks/api";

//import { useUpdateLessonStatus } from "../hooks/mutations";

const arr = getEmptyArr(15);

type LessonProps = { id: ResourceId };

function Lesson({ id }: LessonProps) {
	return (
		<Suspense fallback={<LessonImpl.Loading />}>
			<LessonImpl id={id} />
		</Suspense>
	);
}

function LessonImpl({ id }: LessonProps) {
	const { lesson } = useGetLesson(id);
	const {
		theme: { spacing },
	} = useAppTheme();

	return (
		<>
			<LessonRenderer content={lesson.content?.longDesc?.content} />
			<View
				style={{
					padding: spacing.md,
					flexDirection: "row",
					gap: spacing.md,
					marginInline: "auto",
				}}
			>
				<Share2Icon accessibilityLabel="Share Lesson" />
				<ThumbsUpIcon accessibilityLabel="Like Lesson" />
				<ThumbsDownIcon accessibilityLabel="Dislike Lesson" />
			</View>
			{/*
			<LessonQuizzes lessonId={id} quizzes={lesson.quizzes} />
      */}
		</>
	);
}

interface LessonRendererProps extends EnrichedMarkdownTextProps {}

export function MarkdowRenderer(props: LessonRendererProps) {
	const {
		markdown,
		markdownStyle,
		containerStyle = { flex: 1, height: "100%" },
		...rest
	} = props;
	const { theme } = useAppTheme();
	const { colors, spacing } = theme;

	const styles = useMemo(
		() => ({
			body: {
				color: colors.text,
				fontSize: 18,
			},
			paragraph: {
				fontFamily: "spaceGroteskRegular",
			},
			strong: {
				//fontFamily: "spaceGroteskMedium",
			},
			h1: {
				...$sizeStyles.xxl,
				//...$fontWeightStyles.bold,
			},
			h2: {
				...$sizeStyles.xl,
				//...$fontWeightStyles.semiBold,
				marginTop: spacing.xs,
				marginBottom: spacing.xxs,
			},
			h3: {
				...$sizeStyles.lg,
				//...$fontWeightStyles.bold,
				marginTop: spacing.xxs,
				marginBottom: spacing.xxxs,
			},
			hr: {
				marginBlock: spacing.md,
			},
			link: {
				flex: 1,
				color: colors.tint,
			},
			image: {
				marginTop: 20,
				marginBottom: 20,
				width: "100%",
				height: 220,
				resizeMode: "contain",
			},
			inlineImage: {
				size: 20,
			},
			blockquote: {
				backgroundColor: colors.background,
				borderColor: colors.tint,
				borderLeftWidth: 4,
				marginLeft: 5,
				paddingHorizontal: 5,
				marginTop: 24,
			},
		}),
		[colors, spacing],
	);

	const content = markdown.replace(/(!\[.*?\]\(.*?\))/g, "\n\n$1\n\n");

	return (
		<EnrichedMarkdownText
			containerStyle={containerStyle}
			markdownStyle={markdownStyle ?? styles}
			markdown={content}
			{...rest}
		/>
	);
}

const LessonRenderer = MarkdowRenderer;

// type LessonQuizzesProps = {
// 	lessonId: ResourceId;
// 	quizzes: {
// 		id: number;
// 		lessonId: number;
// 		quizId: number;
// 		quiz: { title: string };
// 	}[];
// };

// function LessonQuizzes({ lessonId, quizzes }: LessonQuizzesProps) {
// 	const { themed } = useAppTheme();
//
// 	const { updateStatus } = useUpdateLessonStatus(lessonId);
//
// 	const handleVisibility = useCallback(
// 		(isVisible: boolean) => {
// 			if (isVisible) {
// 				updateStatus();
// 			}
// 		},
// 		[updateStatus],
// 	);
//
// 	return (
// 		<VisibilitySensor onChange={handleVisibility} triggerOnce delay={500}>
// 			<ListView
// 				recycleItems
// 				data={quizzes}
// 				keyExtractor={(item) => item.id.toString()}
// 				ListHeaderComponent={
// 					quizzes.length > 0 ? undefined : (
// 						<Text preset="subheading" style={themed($quizRootTitle)}>
// 							Test you knowledge with a Quiz
// 						</Text>
// 					)
// 				}
// 				renderItem={({ item }) => <QuizLink quiz={item} />}
// 			/>
// 		</VisibilitySensor>
// 	);
// }

//type QuizLinkProps = { quiz: LessonRendererProps["quizzes"][number] };

// function QuizLink({ quiz }: QuizLinkProps) {
// 	const { themed } = useAppTheme();
// 	return (
// 		<Link screen="Quiz" params={{ quizId: quiz.id }} style={themed($quizLink)}>
// 			<Text>{quiz.quiz.title}</Text>
// 		</Link>
// 	);
// }

LessonImpl.Loading = () => {
	const { width } = useDimensions();
	const {
		theme: { spacing, roundness },
	} = useAppTheme();
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				width="100%"
				height={40}
				marginBottom={spacing.sm}
				borderRadius={roundness}
			/>

			<SkeletonPlaceholder.Item
				width="92%"
				height={24}
				marginBottom={spacing.xs}
				borderRadius={roundness}
			/>
			<SkeletonPlaceholder.Item
				width="85%"
				height={24}
				marginBottom={spacing.xs}
				borderRadius={roundness}
			/>

			<View style={{ gap: spacing.xs }}>
				{arr.map((key) => (
					<SkeletonPlaceholder.Item
						key={key}
						width={Math.floor(Math.random() * (width - 100 + 1) + 100)}
						height={24}
						borderRadius={roundness}
					/>
				))}
			</View>
		</SkeletonPlaceholder>
	);
};

// const $quizRootTitle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
// 	marginBottom: spacing.sm,
// });

// const $quizLink: ThemedStyle<TextStyle> = ({ spacing, roundness }) => ({
// 	width: "100%",
// 	borderColor: "black",
// 	borderWidth: 1,
// 	borderRadius: roundness,
// 	padding: spacing.xs,
// });

export { Lesson };
