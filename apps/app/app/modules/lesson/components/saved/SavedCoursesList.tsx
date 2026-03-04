import {
	$baseListItemSeparatorStyles,
	EmptyListView,
	ListView,
} from "@/components";
import { SavedCourseCard } from "@/modules/lesson/components/saved/SavedCourseCard";
import { useGetSavedCourses } from "@/modules/lesson/hooks/api";
import { useAppTheme } from "@/utils/useAppTheme";

export function SavedCoursesList() {
	const { savedCourses, isRefetching, refetch } = useGetSavedCourses();

	const { themed } = useAppTheme();

	return (
		<ListView
			data={savedCourses}
			keyExtractor={(item) => item.id.toString()}
			refreshing={isRefetching}
			onRefresh={refetch}
			contentContainerStyle={themed($baseListItemSeparatorStyles)}
			ListEmptyComponent={EmptyListView}
			renderItem={({ item }) => (
				<SavedCourseCard
					id={item.id}
					title={item.entity.content.title}
					shortDesc={item.entity.content.shortDesc}
					coverUrl={item.entity.coverUrl}
				/>
			)}
		/>
	);
}
