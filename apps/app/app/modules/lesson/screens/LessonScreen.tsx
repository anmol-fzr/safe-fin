import { GoBack, Screen } from "@/components";
import { $styles } from "@/theme";
import { MissingRouteParamError } from "@/utils/error";
import { Lesson } from "../components/Lesson";
import type { LessonStackScreenProps } from "../navigator";

type LessonScreenProps = LessonStackScreenProps<"Lesson">;

export function LessonScreen(props: LessonScreenProps) {
	const { lessonId } = props.route.params;
	if (!lessonId) {
		throw new MissingRouteParamError("lessonId", "LessonScreen");
	}
	// const { isPending, lessons } = useGetLesson(lessonId);
	//
	// const quizzes = lessons.pages[0]?.data ?? [];

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="lessonScreen:title" />
			<Lesson id={lessonId} />
		</Screen>
	);
}
