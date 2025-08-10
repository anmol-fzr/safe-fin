import { Screen, ScreenHeader, Card } from "@/components";
import { $styles } from "@/theme";
import { Link } from "@react-navigation/native";

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
			<Link screen="Lesson">
				<Card heading="Lesson #1" />
			</Link>
		</Screen>
	);
}
