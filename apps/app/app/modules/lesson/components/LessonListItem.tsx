import { Link } from "@react-navigation/native";
import { View, type ViewStyle } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text } from "@/components";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { ILesson } from "../api";

type LessonListItemProps = Pick<ILesson, "id" | "title" | "desc">;

export function LessonListItem(props: LessonListItemProps) {
	const { id, title, desc } = props;

	const { themed } = useAppTheme();

	return (
		<Link screen="Lesson" params={{ lessonId: id }} style={themed($listItem)}>
			<Text preset="formLabel">{title}</Text>
			{"\n"}
			<Text size="xs" numberOfLines={1}>
				{desc}
			</Text>
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

const $listItem: ThemedStyle<ViewStyle> = ({ colors, spacing, roundness }) => ({
	marginBottom: spacing.md,
	borderRadius: roundness,
	padding: spacing.md,
	borderColor: colors.palette.accent400,
	backgroundColor: colors.palette.accent300,
	borderWidth: 1,
	elevation: 1,
	gap: spacing.xs,
});
