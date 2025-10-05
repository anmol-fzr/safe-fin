import { useCallback, useState } from "react";
import { Pressable, RefreshControl, View } from "react-native";
import { Card, Icon, LoadingCard, Screen, ScreenHeader } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { $styles, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { TopicList } from "../components";
import { LessonList } from "../components/LessonList";
import { useGetLessons } from "../hooks/api";

export function LessonsScreen() {
	const { isPending, lessons } = useGetLessons();

	const { theme } = useAppTheme();

	const data = lessons.pages[0];
	console.log(data);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

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
			<View style={{ gap: spacing.lg }}>
				<TopicList />
				<LessonList />
			</View>
		</Screen>
	);
}
