import { type ReactNode, useMemo } from "react";
import {
	Image,
	type ImageSourcePropType,
	type ImageStyle,
	type StyleProp,
	type TextStyle,
	View,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text, type TextProps } from "@/components/Text";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { SharedButton } from "../shared";

interface LessonCertificateRootProps {
	/**
	 * Children components
	 */
	children: ReactNode;
	/**
	 * Style override for the container
	 */
	style?: StyleProp<ViewStyle>;
}

export function LessonCertificate(props: LessonCertificateRootProps) {
	const { children, style: $styleOverride } = props;
	const { themed } = useAppTheme();

	const style = useMemo(
		() => [themed($container), $styleOverride],
		[themed, $styleOverride],
	);

	return <View style={style}>{children}</View>;
}

interface LessonCertificateHeaderProps extends Omit<ViewProps, "style"> {
	/**
	 * Children components
	 */
	children: ReactNode;
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonCertificateHeader(props: LessonCertificateHeaderProps) {
	const { children, style: $styleOverride, ...rest } = props;

	return (
		<View style={[$header, $styleOverride]} {...rest}>
			{children}
		</View>
	);
}

interface LessonCertificateLabelProps extends Omit<TextProps, "style"> {
	/**
	 * The label text
	 */
	children: string;
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

function LessonCertificateLabel(props: LessonCertificateLabelProps) {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<Text
			{...textProps}
			style={[themed($label), $styleOverride]}
			size="xs"
			weight="medium"
		>
			{children}
		</Text>
	);
}

interface LessonCertificateBadgeProps extends Omit<TextProps, "style"> {
	/**
	 * The badge text
	 */
	children: string;
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

function LessonCertificateBadge(props: LessonCertificateBadgeProps) {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<View style={themed($badge)}>
			<Text
				{...textProps}
				style={[themed($badgeText), $styleOverride]}
				size="xxs"
				weight="bold"
			>
				{children}
			</Text>
		</View>
	);
}

interface LessonCertificateTitleProps extends Omit<TextProps, "style"> {
	/**
	 * The title text
	 */
	children: string;
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

function LessonCertificateTitle(props: LessonCertificateTitleProps) {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<Text
			{...textProps}
			style={[themed($title), $styleOverride]}
			size="lg"
			weight="bold"
		>
			{children}
		</Text>
	);
}

LessonCertificateTitle.Loading = () => {
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				width="80%"
				height={24}
				borderRadius={5}
				marginBottom={8}
			/>
		</SkeletonPlaceholder>
	);
};

interface LessonCertificateImageProps {
	/**
	 * The certificate preview image source
	 */
	source?: ImageSourcePropType;
	/**
	 * Style override for the image container
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonCertificateImage(props: LessonCertificateImageProps) {
	const { source, style: $styleOverride } = props;
	const { themed } = useAppTheme();

	return (
		<View style={[themed($imageContainer), $styleOverride]}>
			{source && (
				<Image source={source} style={$imageStyle} resizeMode="contain" />
			)}
		</View>
	);
}

LessonCertificateImage.Loading = () => {
	const { themed } = useAppTheme();

	const s = themed($imageContainer);

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

interface LessonCertificateProgressProps extends Omit<TextProps, "style"> {
	/**
	 * Progress percentage (0-100)
	 */
	progress: number;
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

function LessonCertificateProgress(props: LessonCertificateProgressProps) {
	const { progress, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<View style={themed($progressContainer)}>
			<View style={themed($progressBar)}>
				<View
					style={[
						themed($progressFill),
						{ width: `${Math.min(100, Math.max(0, progress))}%` },
					]}
				/>
			</View>
			<Text
				{...textProps}
				style={[themed($progressText), $styleOverride]}
				size="sm"
				weight="medium"
			>
				{progress}% complete
			</Text>
		</View>
	);
}

// Styles
const $container: ThemedStyle<ViewStyle> = (theme) => ({
	backgroundColor: theme.colors.palette.neutral100,
	borderRadius: theme.roundness * 2,
	padding: theme.spacing.md,
	borderWidth: 1,
	borderColor: theme.colors.palette.neutral300,
	marginVertical: theme.spacing.md,
});

const $header: ViewStyle = {
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	marginBottom: 12,
};

const $label: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
	letterSpacing: 0.5,
	textTransform: "uppercase",
});

const $badge: ThemedStyle<ViewStyle> = (theme) => ({
	backgroundColor: theme.colors.palette.accent500,
	paddingHorizontal: theme.spacing.sm,
	paddingVertical: theme.spacing.xxs,
	borderRadius: theme.roundness * 0.5,
});

const $badgeText: ThemedStyle<TextStyle> = () => ({
	color: "#FFFFFF",
	letterSpacing: 0.5,
});

const $title: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.text,
	marginBottom: theme.spacing.md,
});

const $imageContainer: ThemedStyle<ViewStyle> = (theme) => ({
	width: "100%",
	height: 240,
	backgroundColor: theme.colors.palette.neutral200,
	borderRadius: theme.roundness * 1.5,
	marginBottom: theme.spacing.md,
	justifyContent: "center",
	alignItems: "center",
	overflow: "hidden",
	borderWidth: 1,
	borderColor: theme.colors.palette.neutral300,
});

const $imageStyle: ImageStyle = {
	width: "100%",
	height: "100%",
};

const $progressContainer: ThemedStyle<ViewStyle> = (theme) => ({
	marginBottom: theme.spacing.md,
});

const $progressBar: ThemedStyle<ViewStyle> = (theme) => ({
	width: "100%",
	height: 8,
	backgroundColor: theme.colors.palette.neutral200,
	borderRadius: theme.roundness * 0.5,
	overflow: "hidden",
	marginBottom: theme.spacing.xs,
});

const $progressFill: ThemedStyle<ViewStyle> = (theme) => ({
	height: "100%",
	backgroundColor: theme.colors.palette.accent500,
	borderRadius: theme.roundness * 0.5,
});

const $progressText: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
	textAlign: "right",
});

// Attach sub-components
LessonCertificate.Header = LessonCertificateHeader;
LessonCertificate.Label = LessonCertificateLabel;
LessonCertificate.Badge = LessonCertificateBadge;
LessonCertificate.Title = LessonCertificateTitle;
LessonCertificate.Image = LessonCertificateImage;
LessonCertificate.Progress = LessonCertificateProgress;
LessonCertificate.Button = SharedButton;

export type {
	LessonCertificateRootProps as LessonCertificateProps,
	LessonCertificateHeaderProps,
	LessonCertificateLabelProps,
	LessonCertificateBadgeProps,
	LessonCertificateTitleProps,
	LessonCertificateImageProps,
	LessonCertificateProgressProps,
};
