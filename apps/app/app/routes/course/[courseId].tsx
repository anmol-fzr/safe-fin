import { isUndefined } from "@safe-fin/utils";
import { useRouter } from "expo-router";
import { z } from "zod";
import { Screen } from "@/components";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { useGetLesson } from "@/modules/lesson/hooks/api";
import { CourseDetailsScreen } from "@/modules/lesson/screens/LessonDetailScreen";
import { idSchema } from "@/schema";

const paramsSchema = z.object({
	courseId: idSchema,
});

export default function CourseScreen() {
	const { courseId } = useTypedLocalSearchParams(paramsSchema);
	const router = useRouter();

	const { lesson } = useGetLesson(courseId);

	if (isUndefined(lesson)) {
		return router.back();
	}

	return (
		<Screen preset="scroll">
			<CourseDetailsScreen>
				<CourseDetailsScreen.ScrollView>
					<CourseDetailsScreen.Content
						title={lesson.content.title}
						description={lesson.content.shortDesc}
						image="https://ilarge.lisimg.com/image/28254022/1118full-iman-vellani.jpg"
						level="Beginner"
						duration="7h"
						points={lesson.points}
						rating={lesson.avgRating}
						ratingCount={lesson.rateCount}
						updatedDate={lesson.updatedAt}
					/>
					<CourseDetailsScreen.Tabs
						desc={lesson.content.longDesc.content}
						chapters={lesson.chapters}
					/>
				</CourseDetailsScreen.ScrollView>
			</CourseDetailsScreen>
		</Screen>
	);
}
