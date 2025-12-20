import { Link } from "expo-router";
import { View, type ViewStyle } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text } from "@/components";
import { useListRadius } from "@/hooks/useListRadius";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { ILesson } from "../api";

type LessonListItemProps = Pick<ILesson, "id" | "title" | "desc"> & {
	isFirst: boolean;
	isLast: boolean;
};

export function LessonListItem(props: LessonListItemProps) {
	const { id, title, desc, isFirst, isLast } = props;
	const { getStyles } = useListRadius({});

	const { themed } = useAppTheme();

	const styles = getStyles({ isFirst, isLast });

	return (
		<Link
			href={{
				pathname: "/tabs/learnings/[lessonId]",
				params: {
					lessonId: id,
				},
			}}
			style={{
				marginBottom: 2,
			}}
		>
			<View style={[themed($listItem), styles]}>
				<Text size="lg" numberOfLines={2}>
					{title}
				</Text>
				<Text size="xs" numberOfLines={3}>
					{desc}
				</Text>
			</View>
		</Link>
	);
}

LessonListItem.Loading = () => {
	const { themed } = useAppTheme();

	const styles = themed($listItem);
	return (
		<View style={{ marginBottom: styles.marginBottom }}>
			<SkeletonPlaceholder
				backgroundColor={styles.backgroundColor?.toString()}
				borderRadius={Number(styles.borderRadius)}
			>
				<SkeletonPlaceholder.Item height={80} width="100%" />
			</SkeletonPlaceholder>
		</View>
	);
};

const $listItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
	width: "100%",
	marginBottom: 3,
	//borderRadius: roundness,
	// borderTopLeftRadius: roundness,
	// borderTopRightRadius: roundness,
	padding: spacing.md,
	paddingBottom: spacing.lg,
	//borderColor: colors.palette.accent400,
	backgroundColor: colors.palette.accent200,
	borderWidth: 0,
	//elevation: 1,
});
