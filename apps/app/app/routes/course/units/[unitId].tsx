import { useRouter } from "expo-router";
import { Suspense } from "react";
import { View } from "react-native";
import { z } from "zod";
import { Button, Screen, Separator, Text } from "@/components";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { MarkdowRenderer } from "@/modules/lesson/components/Lesson";
import { LessonCard } from "@/modules/lesson/components/LessonCard/LessonCard";
import { useSaveCourseProgress } from "@/modules/lesson/hooks/mutations";
import { useGetUnit } from "@/modules/lesson/hooks/units/queries";
import { isNull } from "@/pkg/utils";
import { idSchema } from "@/schema";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const paramsSchema = z.object({
	unitId: idSchema,
});

export default function UnitScreen() {
	const params = useTypedLocalSearchParams(paramsSchema);

	return (
		<Suspense fallback={<Text>Loading...</Text>}>
			<UnitScreenImpl {...params} />
		</Suspense>
	);
}

type Props = z.infer<typeof paramsSchema>;

function UnitScreenImpl(props: Props) {
	const { unitId } = props;
	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const { unit } = useGetUnit(unitId);

	const { content, chapterId, points, nextUnitId } = unit;
	const { title, shortDesc } = content;

	const { saveCourseProgress } = useSaveCourseProgress();
	const router = useRouter();

	function handleCompletion() {
		saveCourseProgress({ courseId: unit.chapter.course.id, chapterId, unitId });

		if (isNull(nextUnitId)) {
			router.back();
		}

		return router.replace(`/course/units/${nextUnitId}`);
	}

	return (
		<Screen preset="auto" contentContainerStyle={$styles.container}>
			<LessonCard.Body>
				<LessonCard.Title style={{ fontSize: 40, lineHeight: 44 }}>
					{title}
				</LessonCard.Title>
				<LessonCard.Description>{shortDesc}</LessonCard.Description>

				<LessonCard.MetadataPoints points={points} />

				<Separator />
				<MarkdowRenderer content={content.longDesc.content} />
				<Separator />

				<View style={{ paddingBlock: 20, gap: spacing.lg }}>
					<FromCourseCard courseTitle={unit.chapter.course.content.title} />

					<Button
						onPress={handleCompletion}
						preset="reversed"
						style={{
							backgroundColor: colors.tint,
							alignItems: "center",
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						Next Unit
					</Button>
				</View>

				{/*
				<View style={{ paddingTop: 48, paddingBlock: 24 }}>
					<Button onPress={handleCompletion}>Mark as Complete</Button>

					<View style={{ gap: spacing.md }}>
						<LessonCard.Share />
						<View style={{ paddingBottom: 60, gap: 24 }}>
							<Text size="xl" weight="medium">
								Complete this lesson and move one step closer to your course
								certificate
							</Text>
							<Button preset="reversed">Start Quiz</Button>
						</View>
					</View>
				</View>
        */}
			</LessonCard.Body>
		</Screen>
	);
}
interface FromCourseCardProps {
	courseTitle: string;
}

const FromCourseCard = (props: FromCourseCardProps) => {
	const { courseTitle } = props;

	const {
		theme: { colors, spacing, roundness, typography },
	} = useAppTheme();

	return (
		<View style={{ gap: spacing.md }}>
			<Text
				weight="medium"
				style={{
					color: colors.textDim,
					fontFamily: typography.secondary?.medium,
				}}
			>
				FROM COURSE
			</Text>

			<View
				style={{
					borderWidth: 1,
					borderColor: colors.border,
					padding: spacing.sm,
					paddingInline: spacing.md,
					borderRadius: roundness,
				}}
			>
				<Text>{courseTitle}</Text>
			</View>
		</View>
	);
};
