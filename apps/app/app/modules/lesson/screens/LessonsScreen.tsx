import { Link } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Pressable, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Icon, LoadingCard, Screen, ScreenHeader } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { $styles, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { TopicList } from "../components";
import { useGetLessons } from "../hooks/api";
import type { LessonStackParamList } from "../navigator";

export function LessonsScreen() {
	const { isPending, lessons } = useGetLessons();

	const { theme } = useAppTheme();

	const data = lessons.pages[0];
	const navigation = useSafeNavigation();

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
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="lessonScreen:title"
				tagLineTx="lessonScreen:tagLine"
			/>
			<View style={{ gap: spacing.lg }}>
				<TopicList />
				{isPending ? (
					<LoadingCard />
				) : (
					<View style={{ gap: spacing.xs }}>
						{data?.data?.map((lesson) => (
							<Pressable
								onPress={() =>
									navigation.push("Lesson", {
										lessonId: lesson.id,
									})
								}
								// screen="Lesson"
								// params={{ lessonId: lesson.id }}
								key={lesson.id}
							>
								<Card
									heading={lesson.title}
									content={lesson.desc}
									ContentTextProps={{ numberOfLines: 2 }}
									RightComponent={
										<Icon
											icon="caretRight"
											color={theme.colors.text}
											size={24}
										/>
									}
								/>
							</Pressable>
						))}
					</View>
				)}
			</View>
		</Screen>
	);
}
