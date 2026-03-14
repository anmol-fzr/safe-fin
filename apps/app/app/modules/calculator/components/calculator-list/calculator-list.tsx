import { getEmptyArr } from "@safe-fin/ui/utils";
import { Suspense } from "react";
import {
	EmptyListView,
	EndListView,
	ListMessageView,
	ListView,
} from "@/components";
import { getCalculatorEmptyState } from "@/utils/faker/emptyState";
//import { usePrefetchListItem } from "@/hooks/usePrefetchListItem";
//import { getLessonOpts } from "@/modules/lesson/hooks/api";
import { useGetCalculators } from "../../hooks/queries";
import { CalculatorListItemImpl } from "./calculator-list-item";

export const CalculatorList = () => {
	return (
		<Suspense fallback={CalculatorListImpl.Loading}>
			<CalculatorListImpl />
		</Suspense>
	);
};

function CalculatorListImpl() {
	const { calculators, isRefetching, refetch, isFetchingNextPage } =
		useGetCalculators();

	// const handleViewableItemsChanged = usePrefetchListItem({
	// 	prefetchQueryFn: getLessonOpts,
	// });

	return (
		<ListView
			data={calculators}
			estimatedItemSize={113}
			refreshing={isRefetching}
			onRefresh={refetch}
			keyExtractor={(item) => item.id.toString()}
			ListEmptyComponent={CalculatorListEmpty}
			ListFooterComponent={
				calculators.length === 0
					? undefined
					: isFetchingNextPage
						? CalculatorListItemImpl.Loading
						: CalculatorListEmpty
			}
			//onViewableItemsChanged={handleViewableItemsChanged}
			renderItem={({ item, data, index }) => (
				<CalculatorListItemImpl
					isFirst={index === 0}
					isLast={index === data.length - 1}
					id={item.id}
					title={item.title}
					desc={item.desc}
				/>
			)}
		/>
	);
}

const arr = getEmptyArr(6);

CalculatorListImpl.Loading = (
	<ListView
		data={arr}
		estimatedItemSize={113}
		keyExtractor={(item) => item.toString()}
		renderItem={CalculatorListItemImpl.Loading}
	/>
);

const CalculatorListEmpty = () => {
	const { emoji, title, subtitle } = getCalculatorEmptyState();
	return <ListMessageView icon={emoji} title={title} desc={subtitle} />;
};
