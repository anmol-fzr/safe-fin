import { Suspense } from "react";
import { ListView } from "@/components";
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
		<Suspense fallback={LessonListImpl.Loading}>
			<LessonListImpl />
		</Suspense>
	);
}

function LessonListImpl() {
	const { lessons: data } = useGetLessons();
	const lessons = data.pages[0].data;
	return (
		<ListView
			data={lessons}
			estimatedItemSize={105}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item: lesson }) => (
				<LessonListItem
					title={lesson.title}
					desc={lesson.desc}
					id={lesson.id}
				/>
			)}
		/>
	);
}
LessonListImpl.Loading = (
	<ListView
		data={lessons}
		estimatedItemSize={105}
		keyExtractor={(item) => item.id.toString()}
		renderItem={() => <LessonListItem.Loading />}
	/>
);
