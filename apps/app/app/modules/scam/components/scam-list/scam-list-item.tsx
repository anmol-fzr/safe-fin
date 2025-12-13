import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text } from "@/components";
import { useListRadius } from "@/hooks/useListRadius";
import type { Scam } from "@/modules/scam/api";
import { spacing } from "@/theme";

interface ListRoundProps {
	isFirst: boolean;
	isLast: boolean;
}

interface ScamListItemProps extends ListRoundProps {
	scam: Scam;
}

export function ScamListItemImpl({ scam, isLast, isFirst }: ScamListItemProps) {
	const { getStyles } = useListRadius({
		mainRadiusMultiplier: 1,
		sideRadiusMultiplier: 0.3,
	});

	const radiusStyles = getStyles({ isFirst, isLast });
	return (
		<Link
			href={{
				pathname: "/tabs/scams/[scamId]",
				params: { scamId: scam.id },
			}}
			style={{
				marginBottom: 2,
			}}
		>
			<View style={[styles.scamListItem, radiusStyles]}>
				<Text size="lg" numberOfLines={1}>
					{scam.title}
				</Text>
				<Text size="xs" numberOfLines={1}>
					{scam.desc}
				</Text>
			</View>
		</Link>
	);
}

ScamListItemImpl.Loading = (props: ListRoundProps) => {
	const { isFirst, isLast } = props;
	const { getStyles } = useListRadius({});

	const radiusStyles = getStyles({ isFirst, isLast });
	return (
		<View
			style={[
				styles.scamListItem,
				radiusStyles,
				{ marginBottom: 2, height: 95 },
			]}
		>
			<SkeletonPlaceholder>
				<SkeletonPlaceholder.Item
					height={24}
					marginBottom={8}
					borderRadius={8}
				/>
				<SkeletonPlaceholder.Item
					height={14}
					marginBottom={2}
					borderRadius={6}
				/>
				<SkeletonPlaceholder.Item height={14} width="40%" borderRadius={6} />
			</SkeletonPlaceholder>
		</View>
	);
};

const styles = StyleSheet.create({
	scamListItem: {
		padding: spacing.md,
		paddingBottom: spacing.lg,
		backgroundColor: "#FFDC86",
		marginBottom: 2,
		borderWidth: 0,
		borderRadius: spacing.md,
	},
});
