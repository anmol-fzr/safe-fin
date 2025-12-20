import { Suspense } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text } from "@/components";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useGetLastLesson } from "../hooks/api";

export function BackToLessonCard() {
	return (
		<Animated.View entering={FadeIn} exiting={FadeOut}>
			<Suspense fallback={<BackToLessonCardImpl.Loading />}>
				<BackToLessonCardImpl />
			</Suspense>
		</Animated.View>
	);
}

function BackToLessonCardImpl() {
	const { lesson } = useGetLastLesson();
	const { themed } = useAppTheme();

	if (lesson === null) return;

	const { title, updatedAt, readMinutes } = lesson;
	const publishedDate = new Date(updatedAt);

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={themed($longCardStyles)}
		>
			<Text preset="bold" size="xl">
				{title}
			</Text>

			<View style={styles.footerContent}>
				<Text preset="formLabel" size="xs">
					{publishedDate.toDateString()}
				</Text>
				<View style={styles.dot} />
				<Text preset="formLabel" size="xs">
					{readMinutes} min read
				</Text>
			</View>
		</Animated.View>
	);
}

BackToLessonCardImpl.Loading = () => {
	const { themed } = useAppTheme();

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={themed($longCardStyles)}
		>
			<SkeletonPlaceholder>
				<SkeletonPlaceholder.Item
					height={30}
					borderRadius={12}
					marginBottom={8}
				/>
				<View style={styles.footerContent}>
					<SkeletonPlaceholder.Item height={18} width="34%" borderRadius={12} />
					<View style={styles.dot} />
					<SkeletonPlaceholder.Item height={18} width="22%" borderRadius={12} />
				</View>
			</SkeletonPlaceholder>
		</Animated.View>
	);
};
const $longCardStyles: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
	backgroundColor: colors.palette.accent300,
	padding: spacing.md,
	borderRadius: spacing.sm,
});

const styles = StyleSheet.create({
	dot: {
		backgroundColor: "black",
		height: 4,
		aspectRatio: 1,
		borderRadius: 4,
	},
	footerContent: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});
