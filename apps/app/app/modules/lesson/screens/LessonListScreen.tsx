import { ScrollView } from "react-native-gesture-handler";
import { Screen, ScreenHeader } from "@/components";
import { $styles, spacing } from "@/theme";
//import { TopicList } from "../components";
import { LessonList } from "../components/LessonList";

export function LessonListScreen() {
	return (
		<Screen
			preset="fixed"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="lessonScreen:title"
				tagLineTx="lessonScreen:tagLine"
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ gap: spacing.lg }}
			>
				{/*
				<TopicList />
        */}
				<LessonList />
			</ScrollView>
		</Screen>
	);
}
