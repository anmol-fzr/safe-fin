import { useAppTheme } from "@/utils/useAppTheme";
import { View } from "react-native";
import { InProgressCourseCardImpl } from "./InProgressCourseCardImpl";
import { Suspense } from "react";
import { useGetLastLeftCourse } from "@/modules/lesson/hooks/api";
import { isNull } from "@safe-fin/utils";

export function InProgressCourseCard() {
	return (
		<Suspense>
			<Card />
		</Suspense>
	);
}

export function Card() {
	const {
		theme: { spacing },
	} = useAppTheme();

	const { course } = useGetLastLeftCourse();

	if (isNull(course)) {
		return <></>;
	}

	return (
		<InProgressCourseCardImpl>
			<InProgressCourseCardImpl.Badge />
			<View style={{ gap: spacing.lg }}>
				<InProgressCourseCardImpl.Title
					title={course?.course?.content?.title}
				/>
				<InProgressCourseCardImpl.Progress
					progress={course?.progress?.percentage}
				/>
				<InProgressCourseCardImpl.Action courseId={course?.course.id} />
			</View>
		</InProgressCourseCardImpl>
	);
}
