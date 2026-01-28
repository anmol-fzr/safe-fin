import { Suspense } from "react";
import {
	$baseListItemSeparatorStyles,
	EmptyListView,
	EndListView,
	ListView,
} from "@/components";
import { ForYouLessonsImpl } from "@/modules/home/components/lessons/ForYouLessonsImpl";
import { useAppTheme } from "@/utils/useAppTheme";
//import { usePrefetchListItem } from "@/hooks/usePrefetchListItem";
import { useGetLessons } from "../hooks/api";
import { LessonCard } from "./LessonCard/LessonCard";
import Animated, { FadeIn } from "react-native-reanimated";
import { makeSpringy } from "@/theme";

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
		hasNextPage,
	} = useGetLessons();

	const handleEndReached = () => {
		if (hasNextPage) fetchNextPage();
	};

	const { themed } = useAppTheme();
	return (
		<ListView
			data={courses}
			recycleItems
			onEndReachedThreshold={0.5}
			estimatedItemSize={300}
			style={{ paddingBottom: 36 }}
			showsVerticalScrollIndicator={false}
			refreshing={isRefetching}
			onRefresh={refetch}
			keyExtractor={(item) => item.id.toString()}
			onEndReached={handleEndReached}
			ListEmptyComponent={EmptyListView}
			ListFooterComponent={
				courses.length === 0
					? undefined
					: isFetchingNextPage
						? LessonListImpl.Loading
						: EndListView
			}
			contentContainerStyle={themed($baseListItemSeparatorStyles)}
			renderItem={({ item, index }) => (
				<Animated.View entering={makeSpringy(FadeIn).delay(50 * index)}>
					<LessonCard id={item.id}>
						<LessonCard.Image source={item.coverUrl}>
							<LessonCard.Bookmark isBookmarked={item.isSaved === 1} />
						</LessonCard.Image>

						<LessonCard.Body>
							<LessonCard.Title>{item.content.title}</LessonCard.Title>
							<LessonCard.Description>
								{item.content.shortDesc}
							</LessonCard.Description>

							<LessonCard.Metadata
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<LessonCard.MetadataLevel level={item.level} />
								<LessonCard.Rating
									rating={item.avgRating}
									count={item.rateCount}
								/>
							</LessonCard.Metadata>
						</LessonCard.Body>
					</LessonCard>
				</Animated.View>
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

LessonListImpl.Loading = ForYouLessonsImpl.Loading;
