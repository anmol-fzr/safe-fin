import { memo } from "react";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text } from "@/components";
import { useListRadius } from "@/hooks/useListRadius";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

interface TopicListItemProps {
	title: string;
	isFirst: boolean;
	isLast: boolean;
}

const leanMul = 0.1;

export function TopicListItem(props: TopicListItemProps) {
	const { title, isFirst, isLast } = props;
	const { themed } = useAppTheme();
	const { getStyles } = useListRadius({
		mainRadiusMultiplier: 1.5,
		sideRadiusMultiplier: 0.1,
	});

	const styles = getStyles({ isFirst, isLast });
	return (
		<View style={[themed($topicListItem), styles]}>
			<Text preset="formLabel">{title}</Text>
		</View>
	);
}

TopicListItem.Loading = memo(() => {
	const { themed } = useAppTheme();
	const styles = themed($topicListItem);
	return (
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				height={styles.height}
				borderRadius={styles.borderRadius}
				style={styles}
			></SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
	);
});

const $topicListItem: ThemedStyle<ViewStyle> = ({
	colors,
	spacing,
	roundness,
}) => ({
	marginRight: spacing.xxs,
	aspectRatio: 1.2,
	height: 105,
	backgroundColor: colors.palette.accent200,
	borderRadius: roundness * leanMul,
	padding: spacing.sm,
	paddingVertical: spacing.md,
	justifyContent: "flex-end",
	shadowColor: colors.palette.neutral800,
	shadowOffset: { width: 0, height: 2 },
});
