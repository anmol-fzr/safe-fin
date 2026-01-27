import { useSafeContext } from "@safe-fin/ui/hooks";
import { useRouter } from "expo-router";
import { Chart, Coin1, Heart, Share, Star1 } from "iconsax-react-nativejs";
import {
	createContext,
	type ReactNode,
	useCallback,
	useMemo,
	ComponentProps,
} from "react";
import {
	Pressable as PressableScale,
	type StyleProp,
	type TextStyle,
	View,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import type { IconTypes } from "@/components/Icon";
import { Text, type TextProps } from "@/components/Text";
import { IconSax } from "@/context/IconContext";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { CourseLevel } from "../../api";
import { useToggleCourseSave } from "../../hooks/mutations";
import { queryClient } from "@/utils/lib/query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLessonOpts } from "../../hooks/api";

type SkeletonPlaceholderItemProps = ComponentProps<
	typeof SkeletonPlaceholder.Item
>;

interface LessonCardContextValue {
	id: number;
}

const LessonCardContext = createContext<LessonCardContextValue | null>(null);

const useLessonCard = () => {
	return useSafeContext(
		LessonCardContext,
		"LessonCard.* Components must be used as child of <LessonCard> only",
	);
};

interface LessonCardRootProps {
	/**
	 * Children components
	 */
	children: ReactNode;
	/**
	 * DB id of the Lesson
	 */
	id: number;
	/**
	 * Style override for the container
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonCard(props: LessonCardRootProps) {
	const { children, id, style: $styleOverride } = props;
	const { themed } = useAppTheme();
	const router = useRouter();

	const handlePress = useCallback(() => {
		router.navigate({
			pathname: "/course/[courseId]",
			params: {
				courseId: id,
			},
		});
	}, [id, router.navigate]);

	const style = useMemo(
		() => [themed($container), $styleOverride],
		[themed, $styleOverride],
	);

	const queryClient = useQueryClient();
	const prefetchCourse = () => {
		queryClient.prefetchQuery(getLessonOpts(id));
	};

	return (
		<LessonCardContext value={{ id }}>
			<PressableScale
				{...{ style }}
				onPress={handlePress}
				onPressIn={prefetchCourse}
			>
				{children}
			</PressableScale>
		</LessonCardContext>
	);
}

LessonCard.Loading = (props: ViewProps) => {
	const { style: $styleOverride, ...rest } = props;
	const { themed } = useAppTheme();

	const style = useMemo(
		() => [themed($container), $styleOverride],
		[themed, $styleOverride],
	);

	return <View style={style} {...rest} />;
};

interface LessonCardIconProps {
	/**
	 * The course icon/image source
	 */
	source?: string;
	/**
	 * Custom icon component
	 */
	children?: ReactNode;
	/**
	 * Style override for the container
	 */
	style?: StyleProp<ViewStyle>;
	/**
	 * Style override for the Image
	 */
	imageStyle?: StyleProp<ViewStyle>;
}

function LessonCardImage(props: LessonCardIconProps) {
	const {
		source,
		children,
		style: $styleOverride,
		imageStyle: $imageStyleOverride,
	} = props;
	const { themed } = useAppTheme();

	const styles = themed($iconContainer);

	return (
		<View style={[styles, $styleOverride]}>
			<Animated.Image
				entering={FadeIn}
				exiting={FadeOut}
				style={[
					{
						flex: 1,
						width: "100%",
						borderRadius: styles.borderRadius,
					},
					$imageStyleOverride,
				]}
				source={{
					uri: source,
				}}
			/>
			{children}
		</View>
	);
}
LessonCardImage.Loading = () => {
	const { themed } = useAppTheme();

	const s = themed($iconContainer);

	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				{...s}
				height={s.height}
				borderRadius={s.borderRadius}
			/>
		</SkeletonPlaceholder>
	);
};

interface LessonCardBookmarkProps {
	/**
	 * Whether the course is bookmarked
	 */
	isBookmarked?: boolean;
	/**
	 * Callback when the bookmark is pressed
	 */
	onPress?: () => void;
}

function LessonCardBookmark(props: LessonCardBookmarkProps) {
	const { isBookmarked = false } = props;
	const { themed, theme } = useAppTheme();

	const { toggleSave } = useToggleCourseSave();
	const { id } = useLessonCard();

	const handlePress = () => {
		toggleSave(id);
	};

	return (
		<PressableScale style={themed($bookmarkButton)} onPress={handlePress}>
			<Heart
				size={20}
				variant={isBookmarked ? "Bold" : "Linear"}
				color={isBookmarked ? theme.colors.error : theme.colors.textDim}
			/>
		</PressableScale>
	);
}

const $bookmarkButton: ThemedStyle<ViewStyle> = (theme) => ({
	position: "absolute",
	top: theme.spacing.sm,
	right: theme.spacing.sm,
	width: 36,
	height: 36,
	borderRadius: theme.roundness,
	backgroundColor: "rgba(20,20,20,0.5)",
	//backgroundColor: theme.colors.palette.neutral400,
	justifyContent: "center",
	alignItems: "center",
});

interface LessonCardShareProps {
	/**
	 * Callback when the bookmark is pressed
	 */
	onPress?: () => void;
}

function LessonCardShare(props: LessonCardShareProps) {
	const { onPress } = props;
	const { themed } = useAppTheme();

	return (
		<PressableScale style={themed($shareButton)} onPress={onPress}>
			<IconSax icon={Share} size={20} />
		</PressableScale>
	);
}

interface LessonCardLabelProps extends Omit<TextProps, "style"> {
	/**
	 * The label text
	 */
	children?: string;
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

function LessonCardLabel(props: LessonCardLabelProps) {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<Text
			{...textProps}
			style={[themed($courseLabel), $styleOverride]}
			size="xxs"
			weight="medium"
		>
			{children}
		</Text>
	);
}

interface LessonCardTitleProps extends Omit<TextProps, "style"> {
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

interface LessonCardBodyProps extends Omit<ViewProps, "style"> {
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonCardBody(props: LessonCardBodyProps) {
	const { style: $styleOverride, ...rest } = props;
	const { themed } = useAppTheme();

	return <View style={[themed($body), $styleOverride]} {...rest} />;
}

const $body: ThemedStyle<ViewStyle> = (theme) => ({
	paddingInline: theme.spacing.xs,
});

function LessonCardTitle(props: LessonCardTitleProps) {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<Text
			{...textProps}
			style={[themed($title), $styleOverride]}
			size="lg"
			weight="semiBold"
		>
			{children}
		</Text>
	);
}

LessonCardTitle.Loading = (props: SkeletonPlaceholderItemProps) => {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				width="90%"
				height={22}
				borderRadius={5}
				marginBottom={6}
				{...props}
			/>
		</SkeletonPlaceholder>
	);
};

interface LessonCardAuthorProps extends Omit<TextProps, "style"> {
	/**
	 * The author name
	 */
	children: string;
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

function LessonCardAuthor(props: LessonCardAuthorProps) {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<Text
			{...textProps}
			style={[themed($author), $styleOverride]}
			size="sm"
			weight="normal"
		>
			{children}
		</Text>
	);
}

interface LessonCardDescriptionProps extends Omit<TextProps, "style"> {
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

function LessonCardDescription(props: LessonCardDescriptionProps) {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<Text
			{...textProps}
			style={[themed($description), $styleOverride]}
			size="sm"
			weight="normal"
			numberOfLines={3}
		>
			{children}
		</Text>
	);
}

LessonCardDescription.Loading = () => {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				width="92%"
				height={16}
				borderRadius={5}
				marginBottom={2}
			/>
			<SkeletonPlaceholder.Item
				width="88%"
				height={16}
				borderRadius={5}
				marginBottom={2}
			/>
			<SkeletonPlaceholder.Item
				width="97%"
				height={16}
				borderRadius={5}
				marginBottom={2}
			/>
		</SkeletonPlaceholder>
	);
};

interface LessonCardMetadataProps {
	/**
	 * Children components (MetadataItem)
	 */
	children: ReactNode;
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonCardMetadata(props: LessonCardMetadataProps) {
	const { children, style: $styleOverride } = props;

	const { themed } = useAppTheme();

	return <View style={[themed($metadataRow), $styleOverride]}>{children}</View>;
}

interface LessonCardMetadataItemProps {
	/**
	 * Icon Component to display
	 */
	Icon: () => ReactNode;
	/**
	 * The text to display
	 */
	children: ReactNode;
	/**
	 * Whether to use semiBold weight
	 */
	semiBold?: boolean;
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonCardMetadataItem(props: LessonCardMetadataItemProps) {
	const { Icon, children, semiBold, style: $styleOverride } = props;
	const { themed } = useAppTheme();

	return (
		<View style={[$metadataItem, $styleOverride]}>
			<Icon />
			<Text
				style={themed($metadataText)}
				size="xs"
				weight={semiBold ? "semiBold" : "normal"}
			>
				{children}
			</Text>
		</View>
	);
}

interface LessonCardRatingProps {
	/**
	 * The rating value
	 */
	rating: number;
	/**
	 * The number of ratings
	 */
	count: number;
	/**
	 * Icon to use
	 */
	icon?: IconTypes;
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonCardRating(props: LessonCardRatingProps) {
	const { rating, count, style: $styleOverride } = props;
	const { themed } = useAppTheme();

	const formattedCount =
		count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();

	return (
		<View style={[$metadataItem, $styleOverride]}>
			<IconSax icon={Star1} size={18} />

			<Text style={themed($metadataText)} size="xs" weight="semiBold">
				{rating.toFixed(1)}
			</Text>
			<Text style={themed($ratingCount)} size="xs" weight="normal">
				({formattedCount})
			</Text>
		</View>
	);
}

const $container: ThemedStyle<ViewStyle> = (theme) => ({
	backgroundColor: theme.colors.palette.neutral100,
	borderRadius: theme.roundness * 2,
	padding: theme.spacing.xs,
	borderWidth: 1,
	borderColor: theme.colors.palette.neutral300,
	// shadowColor: theme.colors.palette.neutral900,
	// shadowOffset: { width: 0, height: 2 },
	// shadowOpacity: theme.isDark ? 0.3 : 0.1,
	// shadowRadius: 8,
	//elevation: 3,
});

const $iconContainer: ThemedStyle<ViewStyle> = (theme) => ({
	width: "100%",
	height: 180,
	backgroundColor: theme.colors.palette.neutral200,
	borderRadius: theme.roundness * 1.5,
	marginBottom: theme.spacing.md,
	justifyContent: "center",
	alignItems: "center",
	position: "relative",
});

const $shareButton: ThemedStyle<ViewStyle> = () => ({
	justifyContent: "center",
	alignItems: "center",
});

const $courseLabel: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
	marginBottom: theme.spacing.xxs,
	letterSpacing: 1,
});

const $title: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.text,
	marginBottom: theme.spacing.xxs,
});

const $author: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.palette.accent500,
	marginBottom: theme.spacing.sm,
});

const $description: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
	marginBottom: theme.spacing.md,
	lineHeight: 20,
});

const $metadataRow: ThemedStyle<ViewStyle> = (theme) => ({
	flexDirection: "row",
	flexWrap: "wrap",
	alignItems: "center",
	columnGap: 12,
	rowGap: 8,
	paddingBottom: theme.spacing.sm,
});

const $metadataItem: ViewStyle = {
	flexDirection: "row",
	alignItems: "center",
	gap: 4,
};

const $metadataText: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
});

const $ratingCount: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
});

LessonCard.Image = LessonCardImage;
LessonCard.Bookmark = LessonCardBookmark;
LessonCard.Share = LessonCardShare;
LessonCard.Label = LessonCardLabel;
LessonCard.Title = LessonCardTitle;
LessonCard.Author = LessonCardAuthor;
LessonCard.Description = LessonCardDescription;
//LessonCard.Metadata = LessonCardMetadata;
LessonCard.MetadataItem = LessonCardMetadataItem;
LessonCard.Rating = LessonCardRating;
LessonCard.Body = LessonCardBody;

LessonCard.Metadata = (props: LessonCardMetadataProps) => {
	const { children, style: $styleOverride } = props;

	const { themed } = useAppTheme();

	return <View style={[themed($metadataRow), $styleOverride]}>{children}</View>;
};

interface LevelMetadataProps {
	level: CourseLevel;
}

LessonCard.MetadataLevel = (props: LevelMetadataProps) => {
	const { level } = props;
	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<LessonCard.MetadataItem Icon={() => <IconSax icon={Chart} size={18} />}>
			<Text
				style={{
					textTransform: "capitalize",
					color: colors.textDim,
				}}
			>
				{level}
			</Text>
		</LessonCard.MetadataItem>
	);
};

interface PointsMetadataProps {
	points: number;
}

LessonCard.MetadataPoints = (props: PointsMetadataProps) => {
	const { points } = props;

	return (
		<LessonCard.MetadataItem Icon={() => <IconSax icon={Coin1} size={18} />}>
			{points.toString()} PX
		</LessonCard.MetadataItem>
	);
};

export type {
	LessonCardRootProps as LessonCardProps,
	LessonCardIconProps,
	LessonCardBookmarkProps,
	LessonCardLabelProps,
	LessonCardTitleProps,
	LessonCardAuthorProps,
	LessonCardDescriptionProps,
	LessonCardMetadataProps,
	LessonCardMetadataItemProps,
	LessonCardRatingProps,
};

export { LessonCard };

LessonCardMetadataItem.Loading = () => {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				width="30%"
				height={18}
				borderRadius={5}
				marginBottom={6}
			/>
		</SkeletonPlaceholder>
	);
};
