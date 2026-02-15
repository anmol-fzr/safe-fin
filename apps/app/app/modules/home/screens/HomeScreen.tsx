import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Screen } from "@/components";
import { getCalculatorsOpts } from "@/modules/calculator/hooks/queries";
import { getLessonsOpts } from "@/modules/lesson/hooks/api";
import { $styles } from "@/theme";
import {
	InProgressCourseCard,
	ProfileCompletionBanner,
	QuickActions,
	ShareAppCard,
	UpdateAvailableCard,
} from "../components";
import { ForYouLessons } from "../components/lessons/ForYouLessons";
import { StreakSheet } from "../components/streak-sheet";
import { useStreakSheet } from "../components/streak-sheet/StreakSheet";
import { useHomeUI } from "../hooks/queries";
import { useStreak } from "../hooks/useStreak";

const componentMap = {
	ProfileCompletionBanner: ProfileCompletionBanner,
	QuickActions: QuickActions,
	InProgressCourseCard: InProgressCourseCard,
	ForYouLessons: ForYouLessons,
	UpdateAvailableCard: UpdateAvailableCard,
	ShareAppCard: ShareAppCard,
} as const;

const usePreloadOtherTabsData = () => {
	const queryClient = useQueryClient();

	useEffect(
		function preloadOtherTabs() {
			queryClient.prefetchInfiniteQuery(getCalculatorsOpts());
			queryClient.prefetchInfiniteQuery(getLessonsOpts());
		},
		[queryClient.prefetchInfiniteQuery],
	);
};

export function HomeScreen() {
	const streak = useStreak();
	const streakSheet = useStreakSheet();
	const { data } = useHomeUI();

	usePreloadOtherTabsData();

	useEffect(
		function handleStreak() {
			if (!streak) {
				return;
			}
			if (streak?.data?.status === "same") {
				return;
			}

			streakSheet.present();
		},
		[streak?.data],
	);

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.fullHeaderScreen}
			safeAreaEdges={["bottom"]}
		>
			{data.data.map((item) => {
				const Component = componentMap[item.componentName];

				return <Component key={item.componentName} />;
			})}

			<StreakSheet streak={streak?.data} />
		</Screen>
	);
}
