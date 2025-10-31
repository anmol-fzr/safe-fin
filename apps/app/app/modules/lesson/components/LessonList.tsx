import { getEmptyArr } from "@safe-fin/ui/utils";
import { Suspense, useCallback } from "react";
import { EmptyListView, ListView } from "@/components";
import { usePrefetchListItem } from "@/hooks/usePrefetchListItem";
import { getLessonOpts, useGetLessons } from "../hooks/api";
import { LessonListItem } from "./LessonListItem";

export function LessonList() {
	return (
		<Suspense fallback={<LessonListImpl.Loading />}>
			<LessonListImpl />
		</Suspense>
	);
}

function LessonListImpl() {
	const { lessons, isRefetching, isFetchingNextPage, fetchNextPage, refetch } =
		useGetLessons();
	const handleViewableItemsChanged = usePrefetchListItem({
		prefetchQueryFn: getLessonOpts,
	});

	const handleEndReached = useCallback(() => fetchNextPage(), [fetchNextPage]);

	return (
		<ListView
			data={lessons}
			refreshing={isRefetching}
			onRefresh={refetch}
			estimatedItemSize={105}
			keyExtractor={(item) => item.id.toString()}
			onEndReached={handleEndReached}
			ListEmptyComponent={EmptyListView}
			onViewableItemsChanged={handleViewableItemsChanged}
			ListFooterComponent={
				isFetchingNextPage ? <LessonListImpl.Loading /> : undefined
			}
			renderItem={({ item, index, data }) => (
				<LessonListItem
					isFirst={index === 0}
					isLast={index === data.length - 1}
					title={item.title}
					desc={item.desc}
					id={item.id}
				/>
			)}
		/>
	);
}

const arr = getEmptyArr(10);

LessonListImpl.Loading = () => (
	<ListView
		data={arr}
		estimatedItemSize={125}
		keyExtractor={(item) => item.toString()}
		renderItem={() => <LessonListItem.Loading />}
	/>
);
