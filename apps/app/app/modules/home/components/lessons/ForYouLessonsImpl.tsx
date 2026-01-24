import { $baseListItemSeparatorStyles, ListView } from "@/components";
import { useGetForYouCourses } from "@/modules/lesson/hooks/api";
import { getEmptyArr } from "@/pkg/ui";
import { useAppTheme } from "@/utils/useAppTheme";
import { ForYouLessonCard } from "./ForYouLessonCard";

export const ForYouLessonsImpl = () => {
	const { courses } = useGetForYouCourses();
	const { themed } = useAppTheme();

	return (
		<ListView
			data={courses}
			horizontal
			recycleItems
			showsVerticalScrollIndicator={false}
			keyExtractor={(item) => item.id.toString()}
			contentContainerStyle={themed($baseListItemSeparatorStyles)}
			renderItem={({ item }) => <ForYouLessonCard course={item} />}
		/>
	);
};

interface ForYouLessonsLoading {
	horizontal?: boolean;
}

ForYouLessonsImpl.Loading = (props: ForYouLessonsLoading) => {
	const arr = getEmptyArr(3);

	const { themed } = useAppTheme();

	return (
		<ListView
			data={arr}
			{...props}
			recycleItems
			showsVerticalScrollIndicator={false}
			keyExtractor={(index) => index.toString()}
			contentContainerStyle={themed($baseListItemSeparatorStyles)}
			renderItem={() => <ForYouLessonCard.Loading {...props} />}
		/>
	);
};
