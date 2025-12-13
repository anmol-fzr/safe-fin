import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components";
import { Lesson } from "@/modules/lesson/components/Lesson";
import { $styles } from "@/theme";
import { MissingRouteParamError } from "@/utils/error";

export default function LessonScreen() {
	const params = useLocalSearchParams();

	if (!params.lessonId) {
		throw new MissingRouteParamError("lessonId", "LessonScreen");
	}

	const lessonId = Number(params.lessonId);

	if (!Number.isSafeInteger(lessonId)) {
		throw new TypeError("lessonId must be a Number");
	}

	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<Lesson id={lessonId} />
		</Screen>
	);
}
