import { getEmptyArr } from "@safe-fin/ui/utils";
import { Suspense } from "react";
import { BaseListItemSeparator, EmptyListView, ListView } from "@/components";
//import { usePrefetchListItem } from "@/hooks/usePrefetchListItem";
import { useGetLessons } from "../hooks/api";
import { LessonCard } from "./LessonCard/LessonCard";
import { LessonListItem } from "./LessonListItem";

export function LessonList() {
	return (
		<Suspense fallback={<LessonListImpl.Loading />}>
			<LessonListImpl />
		</Suspense>
	);
}

function LessonListImpl() {
	const {
		courses,
		isRefetching,
		isFetchingNextPage = false,
		fetchNextPage,
		refetch,
	} = useGetLessons();
	// const handleViewableItemsChanged = usePrefetchListItem({
	// 	prefetchQueryFn: getLessonOpts,
	// });

	//const handleEndReached = useCallback(() => fetchNextPage(), [fetchNextPage]);

	return (
		<ListView
			data={courses}
			recycleItems
			style={{ paddingBottom: 36 }}
			showsVerticalScrollIndicator={false}
			refreshing={isRefetching}
			onRefresh={refetch}
			keyExtractor={(item) => item.id.toString()}
			//onEndReached={handleEndReached}
			ListEmptyComponent={EmptyListView}
			//onViewableItemsChanged={handleViewableItemsChanged}
			ListFooterComponent={
				isFetchingNextPage ? <LessonListImpl.Loading /> : undefined
			}
			ItemSeparatorComponent={BaseListItemSeparator}
			renderItem={({ item }) => (
				<LessonCard id={item.id}>
					<LessonCard.Image source="https://ilarge.lisimg.com/image/28254022/1118full-iman-vellani.jpg">
						<LessonCard.Bookmark isBookmarked={item.isSaved === 1} />
					</LessonCard.Image>

					<LessonCard.Title>{item.content.title}</LessonCard.Title>
					<LessonCard.Description>
						{item.content.shortDesc}
					</LessonCard.Description>

					<LessonCard.Metadata>
						{/*
						<LessonCard.MetadataItem icon="ladybug">
							{item.level}
						</LessonCard.MetadataItem>
						<LessonCard.MetadataItem icon="bell">7h</LessonCard.MetadataItem>
            */}
						<LessonCard.Rating rating={item.avgRating} count={item.rateCount} />
					</LessonCard.Metadata>
				</LessonCard>
			)}
		/>
	);
}

// function LessonListImpl() {
// 	const { lessons, isRefetching, isFetchingNextPage, fetchNextPage, refetch } =
// 		useGetLessons();
// 	// const handleViewableItemsChanged = usePrefetchListItem({
// 	// 	prefetchQueryFn: getLessonOpts,
// 	// });
//
// 	//const handleEndReached = useCallback(() => fetchNextPage(), [fetchNextPage]);
//
// 	return (
// 		<ListView
// 			data={lessons}
// 			refreshing={isRefetching}
// 			onRefresh={refetch}
// 			estimatedItemSize={105}
// 			keyExtractor={(item) => item.id.toString()}
// 			//onEndReached={handleEndReached}
// 			ListEmptyComponent={EmptyListView}
// 			//onViewableItemsChanged={handleViewableItemsChanged}
// 			ListFooterComponent={
// 				isFetchingNextPage ? <LessonListImpl.Loading /> : undefined
// 			}
// 			renderItem={({ item, index, data }) => (
// 				<LessonListItem
// 					isFirst={index === 0}
// 					isLast={index === data.length - 1}
// 					title={item.title}
// 					desc={item.desc}
// 					id={item.id}
// 				/>
// 			)}
// 		/>
// 	);
// }

const arr = getEmptyArr(10);

LessonListImpl.Loading = () => (
	<ListView
		data={arr}
		estimatedItemSize={125}
		keyExtractor={(item) => item.toString()}
		renderItem={() => <LessonListItem.Loading />}
	/>
);
