import { Suspense } from "react";
import { z } from "zod";
import { Screen } from "@/components";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { useGetLesson } from "@/modules/lesson/hooks/api";
import { CourseDetailsScreen } from "@/modules/lesson/screens/LessonDetailScreen";
import { idSchema } from "@/schema";
import { ErrorBoundary } from "@/screens";

const paramsSchema = z.object({
	courseId: idSchema,
});

export default function CourseScreen() {
	const { courseId } = useTypedLocalSearchParams(paramsSchema);

	return (
		<Screen preset="scroll">
			<ErrorBoundary catchErrors="always">
				<Suspense fallback={<CourseScreenImpl.Loading />}>
					<CourseScreenImpl courseId={courseId} />
				</Suspense>
			</ErrorBoundary>
		</Screen>
	);
}

interface CourseScreenImplProps {
	courseId: number;
}

function CourseScreenImpl(props: CourseScreenImplProps) {
	const { courseId } = props;

	const { lesson } = useGetLesson(courseId);

	return (
		<CourseDetailsScreen>
			<CourseDetailsScreen.ScrollView>
				<CourseDetailsScreen.Content
					title={lesson.content.title}
					description={lesson.content.shortDesc}
					image={lesson.coverUrl}
					level="Beginner"
					duration="7h"
					points={lesson.points}
					rating={lesson.rating}
					ratingCount={lesson.rateCount}
					updatedDate={lesson.updatedAt}
				/>
				<CourseDetailsScreen.Tabs
					desc={lesson.content.longDesc.content}
					chapters={lesson.chapters}
				/>
			</CourseDetailsScreen.ScrollView>
		</CourseDetailsScreen>
	);
}

CourseScreenImpl.Loading = () => {
	return (
		<CourseDetailsScreen>
			<CourseDetailsScreen.ScrollView>
				<CourseDetailsScreen.Content.Loading />
				<CourseDetailsScreen.Lessons.Loading />
			</CourseDetailsScreen.ScrollView>
		</CourseDetailsScreen>
	);
};
