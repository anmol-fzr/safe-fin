import { Screen, ScreenHeader, Card, GoBack, Button, Icon } from "@/components";
import { LoadingCard } from "@/components";
import { $styles } from "@/theme";
import { Link } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { LoadingCards } from "@/screens";
import { spacing } from "@/theme";
import { View } from "react-native";
import { useAppTheme } from "@/utils/useAppTheme";

export function LessonsScreen() {
	const { isPending, data, refetch } = useQuery({
		queryKey: ["LESSONS"],
		queryFn: API.LESSON.ALL,
	});

	const { theme } = useAppTheme();

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="learningScreen:title" />
			<ScreenHeader
				titleTx="lessonScreen:title"
				tagLineTx="lessonScreen:tagLine"
			/>
			{isPending ? (
				<LoadingCards />
			) : (
				<View style={{ gap: spacing.xs }}>
					{data?.data?.map((lesson) => (
						<Link
							screen="Lesson"
							params={{ lessonId: lesson.id }}
							key={lesson.id}
						>
							<Card
								heading={lesson.title}
								content={lesson.desc}
								ContentTextProps={{ numberOfLines: 2 }}
								RightComponent={
									<Icon icon="caretRight" color={theme.colors.text} size={24} />
								}
							/>
						</Link>
					))}
				</View>
			)}
		</Screen>
	);
}
