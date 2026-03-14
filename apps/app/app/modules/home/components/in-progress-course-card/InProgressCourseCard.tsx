import { isNull } from "@safe-fin/utils";
import { Suspense } from "react";
import { View } from "react-native";
import { useGetLastLeftCourse } from "@/modules/lesson/hooks/api";
import { useAppTheme } from "@/utils/useAppTheme";
import { InProgressCourseCardImpl } from "./InProgressCourseCardImpl";

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
				<InProgressCourseCardImpl.Title>
					{course?.course?.content?.title}
				</InProgressCourseCardImpl.Title>
				<InProgressCourseCardImpl.Progress
					progress={course?.progress?.percentage}
				/>
				<InProgressCourseCardImpl.Action courseId={course?.course.id} />
			</View>
		</InProgressCourseCardImpl>
	);
}
