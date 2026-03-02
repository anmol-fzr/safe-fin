import { ellipsize } from "@safe-fin/ui/utils";
import { Link } from "expo-router";
import { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { z } from "zod";
import { Button, type ButtonProps, Separator, Text } from "@/components";
import AnimatedScrollProgress from "@/components/shared/micro-interactions/animated-scroll-progress";
import { CircularProgress } from "@/components/shared/organisms/circular-progress";
import { createRoute } from "@/factory/route";
import { useDimensions } from "@/hooks/use-dimensions";
import { FromCourseCard } from "@/modules/lesson/components/FromCourseCard";
import { MarkdowRenderer } from "@/modules/lesson/components/Lesson";
import { LessonCard } from "@/modules/lesson/components/LessonCard/LessonCard";
import { useGetUnit } from "@/modules/lesson/hooks/units/queries";
import { idSchema } from "@/schema";
import type { ThemedTextStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const Route = createRoute({
	paramSchema: z.object({
		unitId: idSchema,
	}),
});

export default function UnitScreen() {
	const params = Route.useParams();

	return (
		<Suspense fallback={<UnitScreenImpl.Loading />}>
			<UnitScreenImpl {...params} />
		</Suspense>
	);
}

type Props = { unitId: number };

function UnitScreenImpl(props: Props) {
	const { unitId } = props;
	const {
		themed,
		theme: { colors, spacing },
	} = useAppTheme();

	const { unit } = useGetUnit(unitId);

	const { content, points, nextUnitId, isCompleted } = unit;
	const { title, shortDesc } = content;

	const progress = useSharedValue(0);

	const { width } = useDimensions("screen");

	return (
		<AnimatedScrollProgress
			fabWidth={width * 0.9}
			fabHeight={56}
			fabBottomOffset={50}
			endReachedThreshold={90}
			fabBackgroundColor={colors.tint}
			fabEndBackgroundColor={colors.palette.neutral900}
			fabBorderRadius={28}
			showFabOnScroll
			fabAppearScrollOffset={50}
			onScrollProgressChange={(_value) => {
				progress.value = _value;
			}}
			style={{
				backgroundColor: colors.background,
			}}
			renderInitialContent={() => (
				<View style={styles.fabContent}>
					<Text size="xs" style={themed($fabTitle)} numberOfLines={1}>
						{ellipsize(unit.content.title, 35)}
					</Text>
					<CircularProgress progress={progress} size={36} strokeWidth={3} />
				</View>
			)}
			renderEndContent={() =>
				isCompleted === 0 ? (
					<CompletionLink unitId={unitId} />
				) : nextUnitId ? (
					<NextUnitLink nextUnitId={nextUnitId} />
				) : (
					<CourseLink courseId={unit.chapter.course.id} />
				)
			}
		>
			<View style={{ padding: spacing.xs }}>
				<LessonCard.Body>
					<LessonCard.Title style={styles.title}>{title}</LessonCard.Title>
					<LessonCard.Description>{shortDesc}</LessonCard.Description>
					<LessonCard.MetadataPoints points={points} />

					<Separator />

					<MarkdowRenderer markdown={content.longDesc.content} />

					<Separator />

					<View
						style={{
							paddingBlock: spacing.sm,
							gap: spacing.lg,
							marginBottom: 120,
						}}
					>
						<FromCourseCard courseTitle={unit.chapter.course.content.title} />
					</View>
				</LessonCard.Body>
			</View>
		</AnimatedScrollProgress>
	);
}

UnitScreenImpl.Loading = () => {
	return (
		<LessonCard.Body>
			<LessonCard.Title.Loading height={44} />
			<LessonCard.Description.Loading />
		</LessonCard.Body>
	);
};

const styles = StyleSheet.create({
	fabContent: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 0,
	},
	continueButton: {
		backgroundColor: "transparent",
	},
	title: { fontSize: 32, lineHeight: 36 },
});

const $fabTitle: ThemedTextStyle = (theme) => ({
	color: theme.colors.textInverse,
	flex: 1,
	paddingRight: 12,
});

const $continueBtnText: ThemedTextStyle = (theme) => ({
	color: theme.colors.text,
});

const ContinueButton = (props: ButtonProps) => {
	const { themed } = useAppTheme();

	return (
		<Button
			{...props}
			preset="reversed"
			style={[styles.continueButton, props.style]} // Merge styles if Link passes any
			textStyle={themed($continueBtnText)}
		>
			Continue
		</Button>
	);
};

interface CompletionLinkProps {
	unitId: number;
}

const CompletionLink = (props: CompletionLinkProps) => {
	const { unitId } = props;

	return (
		<Link
			href={{
				pathname: "/course/units/completion",
				params: {
					unitId,
				},
			}}
			asChild
			replace
		>
			<ContinueButton />
		</Link>
	);
};

interface NextUnitLinkProps {
	nextUnitId: number;
}

const NextUnitLink = (props: NextUnitLinkProps) => {
	const { nextUnitId } = props;

	return (
		<Link
			href={{
				pathname: "/course/units/[unitId]",
				params: {
					unitId: nextUnitId,
				},
			}}
			replace
			asChild
		>
			<ContinueButton />
		</Link>
	);
};

interface CourseLinkProps {
	courseId: number;
}

const CourseLink = (props: CourseLinkProps) => {
	const { courseId } = props;

	return (
		<Link
			href={{
				pathname: "/course/[courseId]",
				params: {
					courseId,
				},
			}}
			asChild
			replace
		>
			<ContinueButton />
		</Link>
	);
};
