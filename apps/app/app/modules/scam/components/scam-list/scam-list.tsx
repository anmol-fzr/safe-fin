import { getEmptyArr } from "@safe-fin/ui/utils";
import { EndListView, ListView } from "@/components";
import { WithSuspense } from "@/components/with-suspense";
//import { usePrefetchListItem } from "@/hooks/usePrefetchListItem";
import {
	// getScamOpts,
	// getScamsOpts,
	useGetScams,
} from "@/modules/scam/hooks/queries";
import { ScamListItemImpl } from "./scam-list-item";

export function ScamList() {
	return <WithSuspense Component={ScamListImpl} />;
}

function ScamListImpl() {
	const { scams, isRefetching, refetch } = useGetScams();
	// const handleViewableItemsChanged = usePrefetchListItem({
	// 	prefetchQueryFn: getScamsOpts(),
	// });

	return (
		<ListView
			showsVerticalScrollIndicator={false}
			data={scams}
			//onViewableItemsChanged={handleViewableItemsChanged}
			refreshing={isRefetching}
			onRefresh={refetch}
			estimatedItemSize={127}
			keyExtractor={(item) => item.id.toString()}
			ListFooterComponent={EndListView}
			renderItem={({ item, data, index }) => (
				<ScamListItemImpl
					scam={item}
					isFirst={index === 0}
					isLast={index === data.length - 1}
				/>
			)}
		/>
	);
}

ScamListImpl.Loading = () => {
	const arr = getEmptyArr(12);

	return (
		<ListView
			showsVerticalScrollIndicator={false}
			data={arr}
			estimatedItemSize={127}
			keyExtractor={(item) => item.toString()}
			renderItem={({ index, data }) => (
				<ScamListItemImpl.Loading
					isFirst={index === 0}
					isLast={index === data.length - 1}
				/>
			)}
		/>
	);
};
