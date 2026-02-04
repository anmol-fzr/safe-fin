import { Button, Screen, Text } from "@/components";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { CourseRating } from "@/modules/lesson/components/CourseRating";
import { useSaveCourseProgress } from "@/modules/lesson/hooks/mutations";
import { useGetUnit } from "@/modules/lesson/hooks/units/queries";
import { $styles, ANIMATION, makeSpringy } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { isNull } from "@safe-fin/utils";
import { useRouter } from "expo-router";
import Animated, {
	FadeInUp,
	SlideInUp,
	ZoomInEasyDown,
} from "react-native-reanimated";
import { z } from "zod";

const trophy = require("assets/images/course/trophy.png");

const paramSchema = z.object({
	unitId: z.coerce.number(),
});

export default function UnitCompletionScreen() {
	const params = useTypedLocalSearchParams(paramSchema);
	const { unitId } = params;

	const { unit } = useGetUnit(unitId);
	const { chapter, chapterId, points, nextUnitId } = unit;

	const { course } = chapter;

	const {
		id: courseId,
		content: { title: courseTitle },
		rating,
		rateCount,
	} = course;

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const router = useRouter();

	//const { saveCourseProgress } = useSaveCourseProgress();

	function handleCompletion() {
		//saveCourseProgress({ courseId, chapterId, unitId });

		if (nextUnitId) {
			return router.replace({
				pathname: "/course/units/[unitId]",
				params: {
					unitId: nextUnitId,
				},
			});
		}

		return router.replace({
			pathname: "/course/[courseId]",
			params: {
				courseId,
			},
		});
	}

	const isLastUnit = isNull(nextUnitId);

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top", "bottom"]}
			contentContainerStyle={[
				$styles.fullHeaderScreen,
				{ flex: 1, paddingTop: spacing.xxl },
			]}
		>
			<Animated.View
				style={{
					alignItems: "center",
					paddingInline: spacing.md,
					gap: spacing.md,
					justifyContent: "space-between",
					flex: 1,
				}}
			>
				<Animated.View
					style={{
						alignItems: "center",
						flex: 1,
					}}
				>
					<Text
						size="sm"
						entering={makeSpringy(FadeInUp, ANIMATION.effects.default)}
					>
						{courseTitle}
					</Text>
					<Text size="xl" weight="semiBold" entering={makeSpringy(FadeInUp)}>
						{isLastUnit ? "Course " : "Unit "}
						Completed !
					</Text>
					<Animated.Image
						source={trophy}
						entering={makeSpringy(ZoomInEasyDown)}
						width={220}
						style={{
							marginTop: spacing.xxl,
						}}
					/>
					<Text
						size="xxl"
						weight="bold"
						entering={makeSpringy(SlideInUp)}
						style={{ color: colors.tint, marginTop: spacing.xl }}
					>
						+ {points} PX
					</Text>
				</Animated.View>

				{rating?.review?.rating ? (
					<></>
				) : (
					<CourseRating
						courseId={courseId}
						rating={rating?.review?.rating ?? 0}
						rateCount={rateCount}
					/>
				)}
				<Button
					preset="reversed"
					onPress={handleCompletion}
					style={{
						backgroundColor: colors.tint,
						width: "100%",
						// alignItems: "center",
						// justifyContent: "center",
						// alignContent: "center",
					}}
				>
					Continue
				</Button>
			</Animated.View>
		</Screen>
	);
}
