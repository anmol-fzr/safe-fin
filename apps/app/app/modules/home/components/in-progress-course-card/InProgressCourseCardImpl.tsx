import { Button, ButtonProps, Text } from "@/components";
import { Section } from "@/components/Section";
import { AnimatedProgressBar } from "@/components/shared/organisms/progress/AnimatedProgress";
import { IconSax } from "@/context/IconContext";
import { ResourceId } from "@/types";
import { useAppTheme } from "@/utils/useAppTheme";
import { InfiniteQueryPageParamsOptions } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Play } from "iconsax-react-nativejs";
import { extend } from "node_modules/zod/v4/core/util.cjs";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

function InProgressCourseCardRoot(props: PropsWithChildren) {
	const { children } = props;

	return <Section.Body preset="filled">{children}</Section.Body>;
}

InProgressCourseCardRoot.Badge = () => {
	const {
		theme: { colors, spacing, roundness },
	} = useAppTheme();

	return (
		<Text
			size="xs"
			style={{
				backgroundColor: colors.palette.neutral100,
				padding: spacing.xxs,
				paddingInline: spacing.sm,
				borderRadius: roundness * 2,
				width: 104,
				textAlign: "center",
				marginBottom: 4,
			}}
		>
			In progress
		</Text>
	);
};

interface InProgressCourseCardTitleProps {
	title: string;
}

InProgressCourseCardRoot.Title = (props: InProgressCourseCardTitleProps) => {
	const { title } = props;

	return (
		<Section.Title numberOfLines={1} size="md">
			{title}
		</Section.Title>
	);
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
		<AnimatedProgressBar
			progress={progress}
			showPercentage
			width="90%"
			progressColor={colors.tint}
			borderRadius={12}
		/>
	);
};

interface InProgressCourseCardActionProps extends ButtonProps {
	courseId: ResourceId;
}

InProgressCourseCardRoot.Action = (props: InProgressCourseCardActionProps) => {
	const { courseId, ...rest } = props;
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
				LeftAccessory={() => (
					<IconSax
						icon={Play}
						variant="Bold"
						color={colors.tint}
						style={{ marginRight: 4 }}
					/>
				)}
				{...rest}
			>
				Continue Course
			</Button>
		</Link>
	);
};

InProgressCourseCardRoot.Body = (props: ViewProps) => {
	const {
		theme: { spacing },
	} = useAppTheme();

	return <View style={{ gap: spacing.lg }} {...props} />;
};

export const InProgressCourseCardImpl = Object.assign(
	InProgressCourseCardRoot,
	{
		Root: InProgressCourseCardRoot,
	},
);
