import { View } from "react-native";
import { Text } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Chapter } from "../../api-types/course_one";
import { UnitBar } from "./UnitBar";

type ChapterProps = {
	chapter: Chapter;
	index: number;
};

export const ChapterBar = (props: ChapterProps) => {
	const { chapter, index = 0 } = props;

	const { title, units } = chapter;

	const {
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
			<View style={{ gap: spacing.xs }}>
				{units.map((unit) => (
					<UnitBar key={unit.id} unit={unit} />
				))}
			</View>
		</View>
	);
};
