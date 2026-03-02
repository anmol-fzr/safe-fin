import {
	$baseListItemSeparatorStyles,
	EmptyListView,
	ListView,
} from "@/components";
import { SavedCourseCard } from "@/modules/lesson/components/saved/SavedCourseCard";
import { useGetSavedCourses } from "@/modules/lesson/hooks/api";
import { useAppTheme } from "@/utils/useAppTheme";

export function SavedCoursesList() {
	const { savedCourses } = useGetSavedCourses();

	const { themed } = useAppTheme();

	return (
		<ListView
			data={savedCourses}
			keyExtractor={(item) => item.id.toString()}
			contentContainerStyle={themed($baseListItemSeparatorStyles)}
			ListEmptyComponent={EmptyListView}
			renderItem={({ item }) => (
				<SavedCourseCard
					coverUrl="https://picsum.photos/seed/NWbJM2B/640/480"
					id={item.id}
					title={item.entity.content.title}
					shortDesc={item.entity.content.shortDesc}
				/>
			)}
		/>
	);
}
