import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMMKVString } from "react-native-mmkv";
import { Screen } from "@/components";
import { getCalculatorsOpts } from "@/modules/calculator/hooks/queries";
import { getLessonsOpts } from "@/modules/lesson/hooks/api";
import { $styles } from "@/theme";
import { storage } from "@/utils/storage";
import {
	DynamicCard,
	InProgressCourseCard,
	ProfileCompletionBanner,
	QuickActions,
	ShareAppCard,
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
	//UpdateAvailableCard: UpdateAvailableCard,
	ShareAppCard: ShareAppCard,
	DynamicCard: DynamicCard,
} as const;

const usePreloadOtherTabsData = () => {
	const queryClient = useQueryClient();

	useEffect(
		function preloadOtherTabs() {
			queryClient.prefetchInfiniteQuery(getCalculatorsOpts());
			queryClient.prefetchInfiniteQuery(getLessonsOpts());
		},
		[queryClient],
	);
};

function getTodayKey() {
	return new Date().toLocaleDateString("en-IN");
}

export function HomeScreen() {
	const streak = useStreak();
	const streakSheet = useStreakSheet();
	const [lastStreakOpenDate, setLastStreakOpenDate] = useMMKVString(
		"last-streak-open-date",
		storage,
	);
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
			const today = getTodayKey();
			if (lastStreakOpenDate === today) {
				return;
			}
			setLastStreakOpenDate(today);

			streakSheet.present();
		},
		[streak, streakSheet, lastStreakOpenDate, setLastStreakOpenDate],
	);

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.fullHeaderScreen}
			//safeAreaEdges={["bottom"]}
		>
			{data.data.map((item) => {
				const { componentName, props = {} } = item;
				const Component = componentMap[componentName];

				if (!Component) {
					return <></>;
				}

				return <Component key={item.componentName} {...props} />;
			})}

			<StreakSheet streak={streak?.data} />
		</Screen>
	);
}
