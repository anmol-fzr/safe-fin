import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Screen } from "@/components";
import { getCalculatorsOpts } from "@/modules/calculator/hooks/queries";
import { getLessonsOpts } from "@/modules/lesson/hooks/api";
import { getScamsOpts } from "@/modules/scam/hooks/queries";
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
import { useStreakSheetRef } from "../components/streak-sheet/StreakSheet";
import { useStreak } from "../hooks/useStreak";

export function HomeScreen() {
	const queryClient = useQueryClient();
	const ref = useStreakSheetRef();
	//const streak = useStreak();

	useEffect(() => {
		queryClient.prefetchInfiniteQuery(getCalculatorsOpts());
		queryClient.prefetchInfiniteQuery(getScamsOpts());
		queryClient.prefetchInfiniteQuery(getLessonsOpts());
	}, [queryClient.prefetchInfiniteQuery]);

	// useEffect(
	// 	function handleStreak() {
	// 		if (streak === null) {
	// 			return;
	// 		}
	// 		if (streak.status === "same") {
	// 			return;
	// 		}
	//
	// 		ref.current?.present();
	// 	},
	// 	[streak?.status],
	// );

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.fullHeaderScreen}
			safeAreaEdges={["bottom"]}
		>
			<ProfileCompletionBanner />
			<QuickActions />
			<InProgressCourseCard />

			<ForYouLessons />
			<UpdateAvailableCard />
			<ShareAppCard />

			<Button onPress={() => ref.current?.present()}>Present</Button>
			{/* {streak !== null && streak.status !== "same" && ( 
			<StreakSheet
				streak={{
					current: 200,
					maximum: 1,
					status: "reset",
				}}
				ref={ref}
			/>
		 )} */}
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		padding: 12,
		alignItems: "center",
		gap: 24,
	},
});
