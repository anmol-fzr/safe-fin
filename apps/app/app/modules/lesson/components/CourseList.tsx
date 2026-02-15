import { Suspense } from "react";
import {
	$baseListItemSeparatorStyles,
	EmptyListView,
	EndListView,
	ListView,
} from "@/components";
import { ForYouLessonsImpl } from "@/modules/home/components/lessons/ForYouLessonsImpl";
import { useAppTheme } from "@/utils/useAppTheme";
import { useGetLessons } from "../hooks/api";
import { LessonCard } from "./LessonCard/LessonCard";
import Animated, { FadeIn } from "react-native-reanimated";
import { makeSpringy, spacing } from "@/theme";
import { View } from "react-native";

export function CourseList() {
	return (
		<Suspense fallback={<CourseListImpl.Loading />}>
			<CourseListImpl />
		</Suspense>
	);
}

function CourseListImpl() {
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
						? CourseListImpl.Loading
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
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										gap: spacing.xs,
									}}
								>
									<LessonCard.MetadataLevel level={item.level} />
									<LessonCard.MetadataPoints points={item.points} />
								</View>
								{item.rateCount >= 1 && item.rating >= 1 && (
									<LessonCard.Rating
										rating={item.rating.toFixed(1)}
										count={item.rateCount}
									/>
								)}
							</LessonCard.Metadata>
						</LessonCard.Body>
					</LessonCard>
				</Animated.View>
			)}
		/>
	);
}

CourseListImpl.Loading = ForYouLessonsImpl.Loading;
