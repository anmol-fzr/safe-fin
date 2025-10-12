import { QuickActions } from "@home/components";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Screen, Text } from "@/components";
import { getCalculatorsOpts } from "@/modules/Calculator/hooks/queries";
import { BackToLessonCard } from "@/modules/lesson/components/BackToLessonCard";
import { getLessonsOpts } from "@/modules/lesson/hooks/api";
import { getScamsOpts } from "@/modules/scam/hooks/queries";
import { $styles, spacing } from "@/theme";
import { envs } from "@/utils/envs";

export function HomeScreen() {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchInfiniteQuery(getCalculatorsOpts());
		queryClient.prefetchInfiniteQuery(getScamsOpts());
		queryClient.prefetchInfiniteQuery(getLessonsOpts());
	}, [queryClient.prefetchInfiniteQuery]);

	return (
		<Screen
			preset="fixed"
			contentContainerStyle={[$styles.container, { gap: spacing.xs }]}
			safeAreaEdges={["top", "bottom"]}
		>
			<BackToLessonCard />
			<Text>{envs.API_URL}</Text>
			<QuickActions />
		</Screen>
	);
}
