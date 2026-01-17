import { formatDate } from "@safe-fin/utils";
import { Link } from "expo-router";
import { Chart, Clock, Coin1 } from "iconsax-react-nativejs";
import type { ReactNode } from "react";
import {
	type ImageSourcePropType,
	ScrollView,
	type StyleProp,
	StyleSheet,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Tabs } from "@/components";
import { Text } from "@/components/Text";
import { IconSax } from "@/context/IconContext";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Chapter } from "../api-types/course_one";
import { MarkdowRenderer } from "../components/Lesson";
import { LessonCertificate } from "../components/LessonCertificate/LessonCertificate";
import { LessonDetail } from "../components/LessonDetail/LessonDetail";
import { LessonListItem } from "../components/LessonListItem/LessonListItem";

export interface LessonData {
	id: string;
	title: string;
	reward: string;
	icon?: ImageSourcePropType;
}

interface LessonDetailScreenRootProps {
	/**
	 * Children components
	 */
	children: ReactNode;
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

interface LessonDetailScreenHeaderProps {
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

interface LessonDetailScreenContentProps {
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

interface LessonDetailScreenLessonsProps {
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

interface LessonDetailScreenCertificateProps {
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

interface LessonDetailScreenTabsProps {
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

export function LessonDetailScreen(props: LessonDetailScreenRootProps) {
	const { children, style: $styleOverride } = props;
	const { themed } = useAppTheme();

	return <View style={[themed($container), $styleOverride]}>{children}</View>;
}

function LessonDetailScreenContent(props: LessonDetailScreenContentProps) {
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
			<LessonDetail.Image source={image} />
			<LessonDetail.Title>{title}</LessonDetail.Title>
			<LessonDetail.Description>{description}</LessonDetail.Description>

			<LessonDetail.Metadata>
				<LessonDetail.MetadataItem
					Icon={() => <IconSax icon={Chart} size={18} />}
				>
					{level}
				</LessonDetail.MetadataItem>

				<LessonDetail.MetadataItem
					Icon={() => <IconSax icon={Coin1} size={18} />}
				>
					{points.toString()} PX
				</LessonDetail.MetadataItem>
				<LessonDetail.MetadataItem
					Icon={() => <IconSax icon={Clock} size={18} />}
				>
					{duration}
				</LessonDetail.MetadataItem>
				<LessonDetail.Rating rating={rating} count={ratingCount} />
				<LessonDetail.Updated>
					Updated {formatDate(updatedDate)}
				</LessonDetail.Updated>
			</LessonDetail.Metadata>

			<View style={{ gap: 8, marginTop: theme.spacing.md }}>
				<LessonDetail.Button>Start course for free</LessonDetail.Button>
			</View>

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

LessonDetailScreenContent.Loading = () => {
	return (
		<>
			<LessonDetail.Image.Loading />
			<LessonDetail.Title.Loading />
			<LessonDetail.Description.Loading />

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

function LessonDetailScreenLessons(props: LessonDetailScreenLessonsProps) {
	const { lessons, levelLabel = "LEVEL 1", onLessonPress } = props;
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

LessonDetailScreenLessons.Loading = () => {
	const { themed } = useAppTheme();

	return (
		<>
			{[1, 2, 3].map((i) => (
				<View key={i} style={themed($lessonItemSkeleton)}>
					<LessonListItem.Icon.Loading />
					<View style={{ flex: 1 }}>
						<LessonListItem.Title.Loading />
					</View>
				</View>
			))}
		</>
	);
};

function LessonDetailScreenCertificate(
	props: LessonDetailScreenCertificateProps,
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

LessonDetailScreenCertificate.Loading = () => {
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

interface LessonDetailTabsProps {
	chapters: Chapter[];
	desc: string;
}

function LessonDetailScreenTabs(props: LessonDetailTabsProps) {
	const { chapters, desc } = props;
	const { theme } = useAppTheme();

	return (
		<Tabs defaultValue="lessons" className="w-[400px]">
			<Tabs.List>
				<Tabs.Trigger value="lessons">Lessons</Tabs.Trigger>
				<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="lessons">
				<View style={{ gap: theme.spacing.xl }}>
					{chapters.map((level, index) => (
						<View key={level.title}>
							<View style={{ flexDirection: "row", gap: 6 }}>
								<Text weight="medium" style={{ color: theme.colors.textDim }}>
									Level {index + 1}
								</Text>

								{/*
								{level.type === "pro" && (
									<Text style={{ color: theme.colors.textDim }}>|</Text>
								)}
								{level.type === "pro" && (
									<Text weight="medium" style={{ color: theme.colors.tint }}>
										PRO
									</Text>
								)}
                */}
							</View>
							<Text weight="medium" size="md" style={{ marginBottom: 12 }}>
								{level.title}
							</Text>
							<View style={{ gap: theme.spacing.xs }}>
								{level.units.map((unit) => (
									<Link
										href={{
											pathname: "/tabs/learnings/units/[unitId]",
											params: {
												unitId: unit.id,
												title: unit.content.title,
												shortDesc: unit.content.shortDesc,
												content: unit.content.longDesc.content,
											},
										}}
										key={unit.id}
									>
										<View style={styles.cardContainer}>
											{/* <View style={styles.iconWrapper}>
										<Image
											source={{
												uri: "https://img.icons8.com/color/96/design.png",
											}}
											style={styles.icon}
										/>
									</View> */}

											<View style={styles.textWrapper}>
												<Text weight="medium" size="sm">
													{unit.content.title}
												</Text>
											</View>

											<Text style={{ color: theme.colors.textDim }} size="xs">
												{unit.points} PX
											</Text>
										</View>
									</Link>
								))}
							</View>
						</View>
					))}
				</View>
			</Tabs.Content>
			<Tabs.Content value="overview">
				<MarkdowRenderer content={desc} />
				{/* <LessonDetailScreenCertificate /> */}
			</Tabs.Content>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 12,
	},
	iconWrapper: {
		width: 48,
		height: 48,
		backgroundColor: "#F5F5F5",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12, // Space between icon and text
	},
	icon: {
		width: 24,
		height: 24,
	},
	textWrapper: {
		flex: 1, // <--- THIS IS THE KEY FIX
		marginRight: 16, // Space between text and the "250 PX"
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: "#000",
		// By default text wraps, but flex: 1 on parent enforces the width limit
	},
	rightText: {
		fontSize: 14,
		color: "#888",
	},
});

interface LessonDetailScreenScrollViewProps {
	/**
	 * Children components
	 */
	children: ReactNode;
}

function LessonDetailScreenScrollView(
	props: LessonDetailScreenScrollViewProps,
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

LessonDetailScreen.ScrollView = LessonDetailScreenScrollView;
LessonDetailScreen.Content = LessonDetailScreenContent;
LessonDetailScreen.Tabs = LessonDetailScreenTabs;
LessonDetailScreen.Lessons = LessonDetailScreenLessons;
LessonDetailScreen.Certificate = LessonDetailScreenCertificate;

export type {
	LessonDetailScreenHeaderProps,
	LessonDetailScreenContentProps,
	LessonDetailScreenLessonsProps,
	LessonDetailScreenCertificateProps,
	LessonDetailScreenTabsProps,
};
