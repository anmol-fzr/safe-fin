import { getEmptyArr } from "@safe-fin/ui/utils";
import { formatDate } from "@safe-fin/utils";
import { Chart, Clock, Firstline, InfoCircle } from "iconsax-react-nativejs";
import { type ReactNode, useState } from "react";
import {
	type ImageSourcePropType,
	ScrollView,
	type StyleProp,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import Animated, {
	FadeInLeft,
	FadeInRight,
	LinearTransition,
} from "react-native-reanimated";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ListView, Tabs } from "@/components";
import { ChipGroup } from "@/components/shared/molecules/animated-chip/Chip";
import { Text } from "@/components/Text";
import { IconSax } from "@/context/IconContext";
import { spacing, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Chapter } from "../api-types/course_one";
import { ChapterList } from "../components/course-details/ChapterList";
import { CourseDetails } from "../components/course-details/CourseDetails";
import { MarkdowRenderer } from "../components/Lesson";
import { LessonCertificate } from "../components/LessonCertificate/LessonCertificate";
import { LessonListItem } from "../components/LessonListItem/LessonListItem";

export interface LessonData {
	id: string;
	title: string;
	reward: string;
	icon?: ImageSourcePropType;
}

interface CourseDetailsScreenRootProps {
	/**
	 * Children components
	 */
	children: ReactNode;
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

interface CourseDetailsScreenHeaderProps {
	/**
	 * Screen title
	 */
	title: string;
	/**
	 * Callback when back button is pressed
	 */
	onBack?: () => void;
	/**
	 * Callback when menu button is pressed
	 */
	onMenu?: () => void;
}

interface CourseDetailsScreenContentProps {
	/**
	 * Course title
	 */
	title: string;
	/**
	 * Course description
	 */
	description: string;
	/**
	 * Course image
	 */
	image: string;
	/**
	 * Course level (e.g., "Intermediate")
	 */
	level: string;
	/**
	 * Course duration (e.g., "7h")
	 */
	duration: string;
	/**
	 * Number of learners
	 */
	// learners: string;
	/**
	 * Points, Accumulated Points of All Units from All Chapters
	 */
	points: number;
	/**
	 * Course rating
	 */
	rating: number;
	/**
	 * Number of ratings
	 */
	ratingCount: number;
	/**
	 * Last updated date
	 */
	updatedDate: string;
	/**
	 * Whether the course is bookmarked
	 */
	isBookmarked?: boolean;
	/**
	 * Callback when bookmark is toggled
	 */
	onBookmarkToggle?: () => void;
	/**
	 * Callback when share is pressed
	 */
	onShare?: () => void;
	/**
	 * Callback when start course is pressed
	 */
	onStartCourse?: () => void;
}

interface CourseDetailsScreenLessonsProps {
	/**
	 * List of lessons
	 */
	lessons: LessonData[];
	/**
	 * Level label (e.g., "LEVEL 1")
	 */
	levelLabel?: string;
	/**
	 * Callback when a lesson is pressed
	 */
	onLessonPress?: (lessonId: string) => void;
}

interface CourseDetailsScreenCertificateProps {
	/**
	 * Certificate image
	 */
	image?: ImageSourcePropType;
	/**
	 * Course progress (0-100)
	 */
	progress?: number;
	/**
	 * Callback when button is pressed
	 */
	onPress?: () => void;
}

interface CourseDetailsScreenTabsProps {
	/**
	 * Children components (tab content)
	 */
	children: ReactNode;
	/**
	 * Initial active tab
	 */
	defaultTab?: string;
	/**
	 * Available tabs
	 */
	tabs?: string[];
}

export function CourseDetailsScreen(props: CourseDetailsScreenRootProps) {
	const { children, style: $styleOverride } = props;
	const { themed } = useAppTheme();

	return <View style={[themed($container), $styleOverride]}>{children}</View>;
}

function CourseDetailsScreenContent(props: CourseDetailsScreenContentProps) {
	const {
		title,
		description,
		image,
		level,
		duration,
		points,
		// learners,
		rating,
		ratingCount,
		updatedDate = new Date(),
		// isBookmarked = false,
		// onBookmarkToggle,
		// onShare,
		// onStartCourse,
	} = props;

	const { theme } = useAppTheme();

	return (
		<>
			<CourseDetails.Image source={image} />
			<CourseDetails.Title>{title}</CourseDetails.Title>
			<CourseDetails.Description>{description}</CourseDetails.Description>

			<CourseDetails.Metadata>
				<CourseDetails.MetadataItem
					Icon={() => <IconSax icon={Chart} size={18} />}
				>
					{level}
				</CourseDetails.MetadataItem>

				<CourseDetails.MetadataPoints points={points} />
				<CourseDetails.MetadataItem
					Icon={() => <IconSax icon={Clock} size={18} />}
				>
					{duration}
				</CourseDetails.MetadataItem>
				<CourseDetails.Rating rating={rating} count={ratingCount} />
				<CourseDetails.Updated>
					Updated {formatDate(updatedDate)}
				</CourseDetails.Updated>
			</CourseDetails.Metadata>

			{/*
			<View style={{ gap: 8, marginTop: theme.spacing.md }}>
				<Button preset="reversed">Start course for free</Button>
			</View>
      */}

			{/*
			<LessonCard.Bookmark
				onPress={onBookmarkToggle}
				isBookmarked={isBookmarked}
			/>
			<LessonCard.Share onPress={onShare} />
      */}
		</>
	);
}

CourseDetailsScreenContent.Loading = () => {
	return (
		<>
			<CourseDetails.Image.Loading />
			<CourseDetails.Title.Loading />
			<CourseDetails.Description.Loading />

			<SkeletonPlaceholder>
				<SkeletonPlaceholder.Item
					width="100%"
					height={20}
					borderRadius={5}
					marginBottom={12}
				/>
				<SkeletonPlaceholder.Item
					width="100%"
					height={20}
					borderRadius={5}
					marginBottom={12}
				/>
				<SkeletonPlaceholder.Item
					width="100%"
					height={48}
					borderRadius={12}
					marginVertical={16}
				/>
			</SkeletonPlaceholder>
		</>
	);
};

function CourseDetailsScreenLessons(props: CourseDetailsScreenLessonsProps) {
	const { lessons, levelLabel = "CHAPTER 1", onLessonPress } = props;
	const { themed } = useAppTheme();

	return (
		<View style={themed($lessonsContainer)}>
			<Text size="xs" weight="semiBold" style={themed($levelLabel)}>
				{levelLabel}
			</Text>

			{lessons.map((lesson, index) => (
				<LessonListItem
					key={lesson.id}
					onPress={() => onLessonPress?.(lesson.id)}
				>
					<LessonListItem.Icon source={lesson.icon} />
					<LessonListItem.Content>
						<LessonListItem.Title>{lesson.title}</LessonListItem.Title>
						<LessonListItem.Reward>{lesson.reward}</LessonListItem.Reward>
					</LessonListItem.Content>
					{index === 0 && <LessonListItem.Button>Start</LessonListItem.Button>}
				</LessonListItem>
			))}
		</View>
	);
}

CourseDetailsScreenLessons.Loading = () => {
	const { themed } = useAppTheme();
	const arr = getEmptyArr(3);

	return (
		<ListView
			data={arr}
			keyExtractor={(item) => item.toString()}
			renderItem={() => (
				<View style={themed($lessonItemSkeleton)}>
					<View style={{ flex: 1 }}>
						<LessonListItem.Title.Loading />
					</View>
					<LessonListItem.Icon.Loading />
				</View>
			)}
		/>
	);
};

function CourseDetailsScreenCertificate(
	props: CourseDetailsScreenCertificateProps,
) {
	const { image, progress = 0, onPress } = props;

	return (
		<LessonCertificate>
			<LessonCertificate.Header>
				<LessonCertificate.Label>CERTIFICATE</LessonCertificate.Label>
				<LessonCertificate.Badge>PRO</LessonCertificate.Badge>
			</LessonCertificate.Header>
			<LessonCertificate.Title>
				Earn a certificate of completion
			</LessonCertificate.Title>
			<LessonCertificate.Image source={image} />
			<LessonCertificate.Progress progress={progress} />
			<LessonCertificate.Button onPress={onPress}>
				Start course for free
			</LessonCertificate.Button>
		</LessonCertificate>
	);
}

CourseDetailsScreenCertificate.Loading = () => {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				width="100%"
				height={400}
				borderRadius={16}
				marginTop={16}
			/>
		</SkeletonPlaceholder>
	);
};

interface CourseDetailsTabsProps {
	chapters: Chapter[];
	desc: string;
}

function CourseDetailsScreenTabs(props: CourseDetailsTabsProps) {
	const { chapters, desc } = props;

	const [selected, setSelected] = useState(0);

	const {
		theme: { colors },
	} = useAppTheme();

	const chips = [
		{
			label: "Chapters",
			activeColor: colors.palette.neutral900,
			inActiveBackgroundColor: colors.palette.neutral300,
			labelColor: selected === 0 ? colors.palette.neutral100 : colors.text,
			icon: () => (
				<IconSax
					icon={Firstline}
					color={selected === 0 ? colors.palette.neutral100 : colors.textDim}
				/>
			),
		},
		{
			label: "Overview",
			activeColor: colors.palette.neutral900,
			inActiveBackgroundColor: colors.palette.neutral300,
			labelColor: selected === 1 ? colors.palette.neutral100 : colors.text,
			icon: () => (
				<IconSax
					icon={InfoCircle}
					color={selected === 1 ? colors.palette.neutral100 : colors.textDim}
				/>
			),
		},
	];

	return (
		<View style={{ marginTop: spacing.md }}>
			<ChipGroup
				chips={chips}
				selectedIndex={selected}
				onChange={setSelected}
			/>

			<View style={{ marginTop: spacing.md }}>
				{selected === 0 ? (
					<Animated.View
						layout={LinearTransition}
						entering={FadeInLeft}
						key={selected}
					>
						<ChapterList chapters={chapters} />
					</Animated.View>
				) : (
					<Animated.View
						layout={LinearTransition}
						entering={FadeInRight}
						key={selected}
					>
						<MarkdowRenderer content={desc} />
					</Animated.View>
				)}
			</View>
		</View>
	);
}

// const styles = StyleSheet.create({
// 	cardContainer: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		padding: 12,
// 		borderWidth: 1,
// 		borderColor: "#E0E0E0",
// 		borderRadius: 12,
// 	},
// 	iconWrapper: {
// 		width: 48,
// 		height: 48,
// 		backgroundColor: "#F5F5F5",
// 		borderRadius: 8,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		marginRight: 12, // Space between icon and text
// 	},
// 	icon: {
// 		width: 24,
// 		height: 24,
// 	},
// 	textWrapper: {
// 		flex: 1, // <--- THIS IS THE KEY FIX
// 		marginRight: 16, // Space between text and the "250 PX"
// 	},
// 	title: {
// 		fontSize: 16,
// 		fontWeight: "600",
// 		color: "#000",
// 		// By default text wraps, but flex: 1 on parent enforces the width limit
// 	},
// 	rightText: {
// 		fontSize: 14,
// 		color: "#888",
// 	},
// });

interface CourseDetailsScreenScrollViewProps {
	/**
	 * Children components
	 */
	children: ReactNode;
}

function CourseDetailsScreenScrollView(
	props: CourseDetailsScreenScrollViewProps,
) {
	const { children } = props;
	const { themed } = useAppTheme();

	return (
		<ScrollView
			style={themed($scrollView)}
			contentContainerStyle={themed($scrollContent)}
			showsVerticalScrollIndicator={false}
		>
			{children}
		</ScrollView>
	);
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
	flex: 1,
	backgroundColor: theme.colors.background,
});

const $scrollView: ThemedStyle<ViewStyle> = () => ({
	flex: 1,
});

const $scrollContent: ThemedStyle<ViewStyle> = (theme) => ({
	paddingHorizontal: theme.spacing.md,
	paddingTop: theme.spacing.lg,
	paddingBottom: theme.spacing.xl,
});

const $lessonsContainer: ThemedStyle<ViewStyle> = (theme) => ({
	marginTop: theme.spacing.md,
});

const $levelLabel: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
	letterSpacing: 0.5,
	marginBottom: theme.spacing.md,
});

const $lessonItemSkeleton: ThemedStyle<ViewStyle> = (theme) => ({
	flexDirection: "row",
	alignItems: "center",
	gap: theme.spacing.md,
	marginBottom: theme.spacing.sm,
	padding: theme.spacing.md,
	backgroundColor: theme.colors.palette.neutral100,
	borderRadius: theme.roundness * 1.5,
	borderWidth: 1,
	borderColor: theme.colors.palette.neutral300,
});

CourseDetailsScreen.ScrollView = CourseDetailsScreenScrollView;
CourseDetailsScreen.Content = CourseDetailsScreenContent;
CourseDetailsScreen.Tabs = CourseDetailsScreenTabs;
CourseDetailsScreen.Lessons = CourseDetailsScreenLessons;
CourseDetailsScreen.Certificate = CourseDetailsScreenCertificate;

export type {
	CourseDetailsScreenHeaderProps,
	CourseDetailsScreenContentProps,
	CourseDetailsScreenLessonsProps,
	CourseDetailsScreenCertificateProps,
	CourseDetailsScreenTabsProps,
};
