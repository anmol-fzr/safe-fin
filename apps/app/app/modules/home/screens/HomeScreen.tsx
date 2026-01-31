import { useQueryClient } from "@tanstack/react-query";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import { Screen } from "@/components";
import { getCalculatorsOpts } from "@/modules/calculator/hooks/queries";
import { getLessonsOpts } from "@/modules/lesson/hooks/api";
import { getScamsOpts } from "@/modules/scam/hooks/queries";
import { $styles } from "@/theme";
import { ForYouLessons } from "../components/lessons/ForYouLessons";
import { QuickActions } from "../components/quick-actions";
import { ProfileCompletionBanner } from "../components/profile-banner";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { PressableScale } from "pressto";
import { IconSax } from "@/context/IconContext";
import { Flash } from "iconsax-react-nativejs";
import { StreakSheetView } from "../components/StreakSheetView";

export function HomeScreen() {
	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.prefetchInfiniteQuery(getCalculatorsOpts());
		queryClient.prefetchInfiniteQuery(getScamsOpts());
		queryClient.prefetchInfiniteQuery(getLessonsOpts());
	}, [queryClient.prefetchInfiniteQuery]);

	const navigation = useNavigation();

	const bottomSheetRef = useRef<BottomSheet>(null);

	const snapPoints = useMemo(() => ["50%", "77%"], []);

	const toggleBottomSheet = useCallback(() => {
		bottomSheetRef.current?.expand();
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<PressableScale
					onPress={toggleBottomSheet}
					style={{
						padding: 4,
						borderRadius: 8,
					}}
				>
					<IconSax icon={Flash} />
				</PressableScale>
			),
		});
	}, [navigation, toggleBottomSheet]);

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.fullHeaderScreen}
			safeAreaEdges={["bottom"]}
		>
			{/*
			<HomeHeader
				titleTx="screens:learningList.title"
				tagLineTx="screens:learningList.tagLine"
				navigation={true}
			/>
      */}
			<ProfileCompletionBanner />
			<QuickActions />
			<ForYouLessons />

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
