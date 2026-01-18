import { isUndefined } from "@safe-fin/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Screen } from "@/components";
import { useGetLesson } from "@/modules/lesson/hooks/api";
import { CourseDetailsScreen } from "@/modules/lesson/screens/LessonDetailScreen";
import { MissingRouteParamError } from "@/utils/error";

export default function CourseScreen() {
	const params = useLocalSearchParams();
	const router = useRouter();

	if (!params.courseId) {
		throw new MissingRouteParamError("courseId", "LessonScreen");
	}
	const { lesson } = useGetLesson(params.courseId);

	if (isUndefined(lesson)) {
		return router.back();
	}

	// const lessonId = Number(params.lessonId);
	//
	// if (!Number.isSafeInteger(lessonId)) {
	// 	throw new TypeError("lessonId must be a Number");
	// }

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
