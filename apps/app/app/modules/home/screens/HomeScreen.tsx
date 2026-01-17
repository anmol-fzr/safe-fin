import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Screen } from "@/components";
import { getCalculatorsOpts } from "@/modules/calculator/hooks/queries";
import { getScamsOpts } from "@/modules/scam/hooks/queries";
import { $styles, spacing } from "@/theme";
import { ForYouLessons } from "../components/ForYouLessons";
import { QuickActions } from "../components/quick-actions";

export function HomeScreen() {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchInfiniteQuery(getCalculatorsOpts());
		queryClient.prefetchInfiniteQuery(getScamsOpts());
		//queryClient.prefetchInfiniteQuery(getLessonsOpts());
	}, [queryClient.prefetchInfiniteQuery]);

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={[
				$styles.container,
				{ gap: spacing.lg, padding: spacing.sm },
			]}
			safeAreaEdges={["top", "bottom"]}
		>
			<QuickActions />
			<ForYouLessons />
		</Screen>
	);
}
