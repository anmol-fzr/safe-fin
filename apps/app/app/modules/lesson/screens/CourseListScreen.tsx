import { Screen } from "@/components";
import { $styles } from "@/theme";
import { CourseList } from "../components/CourseList";

export function CourseListScreen() {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<CourseList />
		</Screen>
	);
}
