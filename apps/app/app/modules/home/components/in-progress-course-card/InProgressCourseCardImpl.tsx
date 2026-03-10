import { Link } from "expo-router";
import type { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Button, type ButtonProps, Text } from "@/components";
import { PromoCardImpl } from "@/components/promo-card";
import type {
	PromoCardBodyProps,
	PromoCardTitleProps,
} from "@/components/promo-card/promo-card";
import { AnimatedProgressBar } from "@/components/shared/organisms/progress/AnimatedProgress";
import type { ResourceId } from "@/types";
import { useAppTheme } from "@/utils/useAppTheme";

function InProgressCourseCardRoot(props: PropsWithChildren) {
	const { children } = props;

	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<PromoCardImpl.Root
			style={{
				backgroundColor: colors.palette.accent300,
			}}
		>
			{children}
		</PromoCardImpl.Root>
	);
}

InProgressCourseCardRoot.Badge = () => {
	const {
		theme: { colors },
	} = useAppTheme();
	return (
		<PromoCardImpl.Badge
			style={{
				backgroundColor: colors.palette.accent100,
				color: colors.palette.accent400,
			}}
		>
			In progress
		</PromoCardImpl.Badge>
	);
};

type InProgressCourseCardTitleProps = PromoCardTitleProps;

InProgressCourseCardRoot.Title = (props: InProgressCourseCardTitleProps) => {
	return <PromoCardImpl.Title numberOfLines={2} {...props} />;
};

interface InProgressCourseCardProgressProps {
	progress: number;
}

InProgressCourseCardRoot.Progress = (
	props: InProgressCourseCardProgressProps,
) => {
	const { progress } = props;
	const {
		theme: { colors, spacing },
	} = useAppTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				gap: spacing.sm,
				flex: 1,
			}}
		>
			<AnimatedProgressBar
				progress={progress}
				progressColor={colors.tint}
				trackColor={colors.palette.accent200}
				borderRadius={12}
			/>
			<Text>{progress * 100}%</Text>
		</View>
	);
};

interface InProgressCourseCardActionProps extends ButtonProps {
	courseId: ResourceId;
}

InProgressCourseCardRoot.Action = (props: InProgressCourseCardActionProps) => {
	const { courseId, style: $styleOverride, ...rest } = props;
	const {
		theme: { colors },
	} = useAppTheme();

	const styles = StyleSheet.flatten([
		{
			backgroundColor: colors.tint,
		},
		$styleOverride,
	]);

	return (
		<Link
			href={{
				pathname: "/course/[courseId]",
				params: {
					courseId,
				},
			}}
			asChild
		>
			<Button preset="reversed" style={styles} {...rest}>
				Continue Course
			</Button>
		</Link>
	);
};

InProgressCourseCardRoot.Body = (props: PromoCardBodyProps) => {
	return <PromoCardImpl.Body {...props} />;
};

export const InProgressCourseCardImpl = Object.assign(
	InProgressCourseCardRoot,
	{
		Root: InProgressCourseCardRoot,
	},
);
