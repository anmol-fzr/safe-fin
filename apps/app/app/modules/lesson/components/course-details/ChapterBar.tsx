import { View } from "react-native";
import { $baseListItemSeparatorStyles, ListView, Text } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Chapter } from "../../api-types/course_one";
import { UnitBar } from "./UnitBar";
import { makeSpringy } from "@/theme";
import Animated, { FadeInUp } from "react-native-reanimated";

type ChapterProps = {
	chapter: Chapter;
	index: number;
};

export const ChapterBar = (props: ChapterProps) => {
	const { chapter, index = 0 } = props;

	const chapterIndex = index;

	const { title, units } = chapter;

	const {
		themed,
		theme: { colors, spacing, typography },
	} = useAppTheme();

	return (
		<View>
			<View style={{ flexDirection: "row", gap: 6 }}>
				<Text
					weight="medium"
					style={{
						color: colors.textDim,
						fontFamily: typography.secondary?.medium,
					}}
				>
					LEVEL {index + 1}
				</Text>
				{/*
				{level.type === "pro" && (
					<Text style={{ color: theme.colors.textDim }}>|</Text>
				)}
				{level.type === "pro" && (
					<Text weight="medium" style={{ color: theme.colors.tint }}>
						PRO
					</Text>
				)}
        */}
			</View>
			<Text weight="medium" size="md" style={{ marginBottom: 12 }}>
				{title}
			</Text>
			<View style={{ gap: spacing.xs, flex: 1 }}>
				<ListView
					data={units}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item, index }) => (
						<Animated.View
							entering={makeSpringy(FadeInUp).delay(
								50 * (index + chapterIndex),
							)}
						>
							<UnitBar unit={item} />
						</Animated.View>
					)}
					contentContainerStyle={themed($baseListItemSeparatorStyles)}
				/>
			</View>
		</View>
	);
};
