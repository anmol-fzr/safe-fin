import { VisibilitySensor } from "@futurejj/react-native-visibility-sensor";
import { Link } from "@react-navigation/native";
import { getEmptyArr } from "@safe-fin/ui/utils";
import {
	Share as Share2Icon,
	Dislike as ThumbsDownIcon,
	Like1 as ThumbsUpIcon,
} from "iconsax-react-nativejs";
import { Suspense, useCallback, useMemo } from "react";
import { View, type ViewStyle } from "react-native";
import Markdown from "react-native-markdown-display";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { $fontWeightStyles, $sizeStyles, ListView, Text } from "@/components";
import { useDimensions } from "@/hooks/useDimensions";
import type { ThemedStyle } from "@/theme";
import { spacing } from "@/theme";
import type { ResourceId } from "@/types";
import { useAppTheme } from "@/utils/useAppTheme";
import { useGetLesson } from "../hooks/api";
import { useUpdateLessonStatus } from "../hooks/mutations";

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
			<LessonRenderer content={lesson.content} />
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

type LessonRendererProps = {
	content: string;
};

function LessonRenderer({ content }: LessonRendererProps) {
	const styles = useMemo(
		() => ({
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
		}),
		[],
	);

	return <Markdown style={styles}>{content}</Markdown>;
}

type LessonQuizzesProps = {
	lessonId: ResourceId;
	quizzes: {
		id: number;
		lessonId: number;
		quizId: number;
		quiz: { title: string };
	}[];
};

function LessonQuizzes({ lessonId, quizzes }: LessonQuizzesProps) {
	const { themed } = useAppTheme();

	const { updateStatus } = useUpdateLessonStatus(lessonId);

	const handleVisibility = useCallback(
		(isVisible: boolean) => {
			if (isVisible) {
				updateStatus();
			}
		},
		[updateStatus],
	);

	return (
		<VisibilitySensor onChange={handleVisibility} triggerOnce delay={500}>
			<ListView
				recycleItems
				data={quizzes}
				keyExtractor={(item) => item.id.toString()}
				ListHeaderComponent={
					quizzes.length > 0 ? undefined : (
						<Text preset="subheading" style={themed($quizRootTitle)}>
							Test you knowledge with a Quiz
						</Text>
					)
				}
				renderItem={({ item }) => <QuizLink quiz={item} />}
			/>
		</VisibilitySensor>
	);
}

type QuizLinkProps = { quiz: LessonRendererProps["quizzes"][number] };

function QuizLink({ quiz }: QuizLinkProps) {
	const { themed } = useAppTheme();
	return (
		<Link screen="Quiz" params={{ quizId: quiz.id }} style={themed($quizLink)}>
			<Text>{quiz.quiz.title}</Text>
		</Link>
	);
}

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

const $quizRootTitle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginBottom: spacing.sm,
});

const $quizLink: ThemedStyle<ViewStyle> = ({ spacing, roundness }) => ({
	width: "100%",
	borderColor: "black",
	borderWidth: 1,
	borderRadius: roundness,
	padding: spacing.xs,
});

export { Lesson };
