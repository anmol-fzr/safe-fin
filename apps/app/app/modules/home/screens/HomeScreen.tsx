import { QuickActions } from "@home/components";
import { Screen } from "@/components";
import { BackToLessonCard } from "@/modules/lesson/components/BackToLessonCard";
import { $styles, spacing } from "@/theme";

export function HomeScreen() {
	return (
		<Screen
			preset="fixed"
			contentContainerStyle={[$styles.container, { gap: spacing.xs }]}
			safeAreaEdges={["top", "bottom"]}
		>
			<BackToLessonCard />

			<QuickActions />
		</Screen>
	);
}
