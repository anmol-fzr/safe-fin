import { Link } from "@react-navigation/native";
import { getEmptyArr } from "@safe-fin/ui/utils";
import { Suspense } from "react";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { EmptyListView, ListView, Text } from "@/components";
import { useListRadius } from "@/hooks/useListRadius";
import { usePrefetchListItem } from "@/hooks/usePrefetchListItem";
import { getLessonOpts } from "@/modules/lesson/hooks/api";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useGetCalculators } from "../hooks/queries";

export const CalculatorList = () => {
	return (
		<Suspense fallback={CalculatorListImpl.Loading}>
			<CalculatorListImpl />
		</Suspense>
	);
};

function CalculatorListImpl() {
	const { calculators, isRefetching, refetch } = useGetCalculators();

	const handleViewableItemsChanged = usePrefetchListItem({
		prefetchQueryFn: getLessonOpts,
	});

	return (
		<ListView
			data={calculators}
			estimatedItemSize={113}
			refreshing={isRefetching}
			onRefresh={refetch}
			keyExtractor={(item) => item.title}
			ListEmptyComponent={EmptyListView}
			onViewableItemsChanged={handleViewableItemsChanged}
			renderItem={({ item, data, index }) => (
				<CalculatorListItem
					isFirst={index === 0}
					isLast={index === data.length - 1}
					id={item.id}
					title={item.title}
					desc={item.list.desc}
				/>
			)}
		/>
	);
}

interface CalculatorListItemImplProps {
	id: number;
	title: string;
	desc: string;
	isFirst: boolean;
	isLast: boolean;
}

function CalculatorListItem(props: CalculatorListItemImplProps) {
	const { id, title, desc, isFirst, isLast } = props;
	const { themed } = useAppTheme();

	const { getStyles } = useListRadius({});

	const styles = getStyles({ isFirst, isLast });
	return (
		<Link
			screen="Calculator"
			params={{
				id,
			}}
			style={[themed($calculatorListItem), styles]}
		>
			<View>
				<Text size="lg">{title}</Text>
				<Text size="xs">{desc}</Text>
			</View>
		</Link>
	);
}

CalculatorListItem.Loading = () => (
	<SkeletonPlaceholder>
		<SkeletonPlaceholder.Item
			height={100}
			width="100%"
			borderRadius={24}
			marginBottom={12}
		/>
	</SkeletonPlaceholder>
);

const $calculatorListItem: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
	padding: spacing.md,
	paddingBottom: spacing.lg,
	backgroundColor: colors.successBackground,
	//borderRadius: spacing.md,
	gap: spacing.xs,
	marginBottom: 2,
});

const arr = getEmptyArr(6);

CalculatorListImpl.Loading = (
	<ListView
		data={arr}
		estimatedItemSize={113}
		keyExtractor={(item) => item.toString()}
		renderItem={CalculatorListItem.Loading}
	/>
);
