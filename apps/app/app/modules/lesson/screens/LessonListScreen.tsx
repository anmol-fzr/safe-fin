import { ScrollView } from "react-native";
import { Screen } from "@/components";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { LessonList } from "../components/LessonList";

export function LessonListScreen() {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<LessonList />
		</Screen>
	);
}
