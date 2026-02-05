import { Button, ButtonProps, Text } from "@/components";
import { PromoCardImpl } from "@/components/promo-card";
import {
	PromoCardBodyProps,
	PromoCardTitleProps,
} from "@/components/promo-card/promo-card";
import { AnimatedProgressBar } from "@/components/shared/organisms/progress/AnimatedProgress";
import { IconSax } from "@/context/IconContext";
import { colors, spacing } from "@/theme";
import { ResourceId } from "@/types";
import { useAppTheme } from "@/utils/useAppTheme";
import { Link } from "expo-router";
import { Play } from "iconsax-react-nativejs";
import { PropsWithChildren } from "react";
import { s } from "../../../../../../../packages/db/dist/index-FWGwJAh7.mjs";
import { View } from "react-native";

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
	return (
		<PromoCardImpl.Badge
			style={{
				backgroundColor: colors.palette.accent100,
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
		theme: { colors },
	} = useAppTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				gap: spacing.xs,
				flex: 1,
			}}
		>
			<AnimatedProgressBar
				progress={progress}
				width="90%"
				progressColor={colors.tint}
				trackColor={colors.palette.accent100}
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
			<Button
				preset="reversed"
				style={{
					backgroundColor: colors.tint,
				}}
				{...rest}
			>
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
