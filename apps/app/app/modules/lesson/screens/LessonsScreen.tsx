import { View } from "react-native";
import { Screen, ScreenHeader } from "@/components";
import { $styles, spacing } from "@/theme";
import { TopicList } from "../components";
import { LessonList } from "../components/LessonList";

export function LessonsScreen() {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="lessonScreen:title"
				tagLineTx="lessonScreen:tagLine"
			/>
			<View style={{ gap: spacing.lg }}>
				<TopicList />
				<LessonList />
			</View>
		</Screen>
	);
}
