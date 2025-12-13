import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Screen } from "@/components";
import { getCalculatorsOpts } from "@/modules/calculator/hooks/queries";
import { BackToLessonCard } from "@/modules/lesson/components/BackToLessonCard";
import { getLessonsOpts } from "@/modules/lesson/hooks/api";
import { getScamsOpts } from "@/modules/scam/hooks/queries";
import { $styles, spacing } from "@/theme";
import { QuickActions } from "../components/quick-actions";

export function HomeScreen() {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchInfiniteQuery(getCalculatorsOpts());
		queryClient.prefetchInfiniteQuery(getScamsOpts());
		queryClient.prefetchInfiniteQuery(getLessonsOpts());
	}, [queryClient.prefetchInfiniteQuery]);

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={[$styles.container, { gap: spacing.xs }]}
			safeAreaEdges={["top", "bottom"]}
		>
			<BackToLessonCard />
			<QuickActions />
		</Screen>
	);
}
