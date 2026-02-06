import { useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "@/components";
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
//import { StreakSheetView } from "../components/StreakSheetView";

export function HomeScreen() {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchInfiniteQuery(getCalculatorsOpts());
		queryClient.prefetchInfiniteQuery(getScamsOpts());
		queryClient.prefetchInfiniteQuery(getLessonsOpts());
	}, [queryClient.prefetchInfiniteQuery]);

	const navigation = useNavigation();

	// const bottomSheetRef = useRef<BottomSheet>(null);
	//
	// const snapPoints = useMemo(() => ["50%", "77%"], []);
	//
	// const toggleBottomSheet = useCallback(() => {
	// 	bottomSheetRef.current?.expand();
	// }, []);
	//
	// useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerRight: () => (
	// 			<PressableScale
	// 				onPress={toggleBottomSheet}
	// 				style={{
	// 					padding: 4,
	// 					borderRadius: 8,
	// 				}}
	// 			>
	// 				<IconSax icon={Flash} />
	// 			</PressableScale>
	// 		),
	// 	});
	// }, [navigation, toggleBottomSheet]);

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

			{/*
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
				// onChange={(index) => {
				// 	console.log("Bottom sheet index:", index);
				// }}
			>
				<BottomSheetView style={styles.contentContainer}>
					<StreakSheetView />
				</BottomSheetView>
			</BottomSheet>
      */}
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
