import { Suspense } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text } from "@/components";
import type { ThemedStyle } from "@/theme";
import type { ResourceId } from "@/types";
import { useAppTheme } from "@/utils/useAppTheme";

interface BackToLessonCardProps {
	lessonId: ResourceId;
}

export function BackToLessonCard() {
	return (
		<Suspense fallback={<BackToLessonCardImpl.Loading />}>
			<BackToLessonCardImpl
				title="Make Your Money Work for You"
				publishedDate={new Date()}
				readMinutes={2}
			/>
		</Suspense>
	);
}

type BackToLessonCardImplProps = {
	title: string;
	publishedDate: Date;
	readMinutes: number;
};

function BackToLessonCardImpl(props: BackToLessonCardImplProps) {
	const { title, publishedDate, readMinutes } = props;

	const { themed } = useAppTheme();
	return (
		<View style={themed($longCardStyles)}>
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
		</View>
	);
}

BackToLessonCardImpl.Loading = () => {
	return (
		<View style={{ height: 112 }}>
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
		</View>
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
