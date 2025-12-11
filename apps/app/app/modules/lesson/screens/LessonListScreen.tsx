import { Screen } from "@/components";
import { $styles } from "@/theme";
import { LessonList } from "../components/LessonList";

export function LessonListScreen() {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<LessonList />
		</Screen>
	);
}
