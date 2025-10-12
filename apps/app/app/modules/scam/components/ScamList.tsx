import { Link } from "@react-navigation/native";
import { getEmptyArr } from "@safe-fin/ui/utils";
import { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ListView, Text } from "@/components";
import { useListRadius } from "@/hooks/useListRadius";
import { usePrefetchListItem } from "@/hooks/usePrefetchListItem";
import type { Scam } from "@/modules/scam/api";
import { getScamOpts, useGetScams } from "@/modules/scam/hooks/queries";
import { spacing } from "@/theme";

export function ScamList() {
	return (
		<Suspense fallback={<ScamListImpl.Loading />}>
			<ScamListImpl />
		</Suspense>
	);
}

function ScamListImpl() {
	const { scams, isRefetching, refetch } = useGetScams();
	const handleViewableItemsChanged = usePrefetchListItem({
		prefetchQueryFn: getScamOpts,
	});

	return (
		<ListView
			showsVerticalScrollIndicator={false}
			data={scams}
			onViewableItemsChanged={handleViewableItemsChanged}
			refreshing={isRefetching}
			onRefresh={refetch}
			estimatedItemSize={127}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item, data, index }) => (
				<ScamListItem
					scam={item}
					isFirst={index === 0}
					isLast={index === data.length - 1}
				/>
			)}
		/>
	);
}
const arr = getEmptyArr(12);

ScamListImpl.Loading = () => {
	return (
		<ListView
			showsVerticalScrollIndicator={false}
			data={arr}
			estimatedItemSize={127}
			keyExtractor={(item) => item.toString()}
			renderItem={({ index, data }) => (
				<ScamListItem.Loading
					isFirst={index === 0}
					isLast={index === data.length - 1}
				/>
			)}
		/>
	);
};

type ScamListItemProps = {
	scam: Scam;
	isFirst: boolean;
	isLast: boolean;
};

function ScamListItem({ scam, isLast, isFirst }: ScamListItemProps) {
	const { getStyles } = useListRadius({
		mainRadiusMultiplier: 1,
		sideRadiusMultiplier: 0.3,
	});

	const radiusStyles = getStyles({ isFirst, isLast });
	return (
		<Link
			screen="Scam"
			params={{ scamId: scam.id }}
			style={{
				marginBottom: 2,
			}}
		>
			<View style={[styles.scamListItem, radiusStyles]}>
				<Text size="lg" numberOfLines={2}>
					{scam.title}
				</Text>
				<Text size="xs" numberOfLines={3}>
					{scam.desc}
				</Text>
			</View>
		</Link>
	);
}

ScamListItem.Loading = (props) => {
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
		backgroundColor: "#FFDC86",
		borderWidth: 0,
		padding: spacing.md,
		borderRadius: spacing.md,
	},
});
