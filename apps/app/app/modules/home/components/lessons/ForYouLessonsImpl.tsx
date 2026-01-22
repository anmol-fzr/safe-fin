import { useMemo } from "react";
import { BaseListItemSeparator, EmptyListView, ListView } from "@/components";
import { useDimensions } from "@/hooks/use-dimensions";
import { LessonCard } from "@/modules/lesson/components/LessonCard/LessonCard";
import { useGetForYouCourses } from "@/modules/lesson/hooks/api";
import { getEmptyArr } from "@/pkg/ui";
import { clamp } from "@/pkg/utils";

export const ForYouLessonsImpl = () => {
	const { courses } = useGetForYouCourses();
	const { width } = useDimensions("window");

	const courseCardMaxWidth = useMemo(
		() => clamp(300, Math.round(width * 0.85), 500),
		[width],
	);

	return (
		<ListView
			data={courses}
			horizontal
			recycleItems
			showsVerticalScrollIndicator={false}
			keyExtractor={(item) => item.id.toString()}
			ItemSeparatorComponent={BaseListItemSeparator}
			ListEmptyComponent={EmptyListView}
			renderItem={({ item }) => (
				<LessonCard
					id={item.id}
					style={{
						maxWidth: courseCardMaxWidth,
					}}
				>
					<LessonCard.Image source="https://ilarge.lisimg.com/image/28254022/1118full-iman-vellani.jpg">
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
			)}
		/>
	);
};

interface ForYouLessonsLoading {
	horizontal?: boolean;
}

ForYouLessonsImpl.Loading = (props: ForYouLessonsLoading) => {
	const arr = getEmptyArr(3);
	const { width } = useDimensions("window");

	const courseCardMaxWidth = useMemo(
		() => clamp(300, Math.round(width * 0.85), 500),
		[width],
	);

	const cardStyles = props.horizontal
		? {
				maxWidth: courseCardMaxWidth,
				minWidth: courseCardMaxWidth,
			}
		: undefined;

	return (
		<ListView
			data={arr}
			{...props}
			recycleItems
			showsVerticalScrollIndicator={false}
			keyExtractor={(index) => index.toString()}
			ItemSeparatorComponent={BaseListItemSeparator}
			renderItem={() => (
				<LessonCard.Loading style={cardStyles}>
					<LessonCard.Image />

					<LessonCard.Body>
						<LessonCard.Title.Loading />
						<LessonCard.Description.Loading />

						<LessonCard.Metadata
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<LessonCard.MetadataItem.Loading />
							<LessonCard.MetadataItem.Loading />
						</LessonCard.Metadata>
					</LessonCard.Body>
				</LessonCard.Loading>
			)}
		/>
	);
};
