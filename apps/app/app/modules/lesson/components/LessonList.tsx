import { Suspense } from "react";
import { View } from "react-native";
import { ListView, Text } from "@/components";
import { spacing } from "@/theme";
import { useGetLessons } from "../hooks/api";
import { LessonListItem } from "./LessonListItem";

const lessons = [
	{
		id: 15,
		title: "Title Content",
		desc: "Description Content",
		isPublished: true,
		createdAt: "2025-09-09T15:40:22.000Z",
		updatedAt: "2025-09-09T15:40:22.000Z",
	},
	{
		id: 9,
		title: "Updated Lesson",
		desc: "Why you need an emergency fund and how to build one to protect against unexpected expenses.",
		isPublished: true,
		createdAt: "2025-08-11T15:31:09.000Z",
		updatedAt: "2025-08-11T15:31:09.000Z",
	},
];

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

	return (
		<View>
			<ListView
				data={lessons}
				refreshing={isRefetching}
				onRefresh={refetch}
				estimatedItemSize={105}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={() => fetchNextPage()}
				renderItem={({ item: lesson }) => (
					<LessonListItem
						title={lesson.title}
						desc={lesson.desc}
						id={lesson.id}
					/>
				)}
			/>
			{isFetchingNextPage && <LessonListImpl.Loading />}
		</View>
	);
}
LessonListImpl.Loading = () => (
	<ListView
		data={lessons}
		estimatedItemSize={96}
		keyExtractor={(item) => item.id.toString()}
		renderItem={() => <LessonListItem.Loading />}
	/>
);
