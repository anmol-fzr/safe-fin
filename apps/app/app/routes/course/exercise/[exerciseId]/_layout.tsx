import { Stack, useRouter } from "expo-router";
import { GoBack, Text } from "@/components";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { IconSax } from "@/context/IconContext";
import { CloseCircle, CloseSquare } from "iconsax-react-nativejs";
import { ScreenHeaderImpl } from "@/components/ScreenHeaderImpl";
import { PressableScale } from "pressto";
import { useAppTheme } from "@/utils/useAppTheme";
import { AnimatedProgressBar } from "@/components/shared/organisms/progress/AnimatedProgress";
import { colors, spacing } from "@/theme";
import { useExerciseStore } from "@/modules/exercise/store";
import { Exercise } from "@/modules/exercise/components/Exercise";

const ExerciseScreenHeader = (props: NativeStackHeaderProps) => {
	return <GoBack tx={props.options.title ?? "Course"} {...props} />;
};

const Header = (props: NativeStackHeaderProps) => {
	const router = useRouter();

	const handleClose = () => {
		if (router.canGoBack()) {
			router.back();
			return;
		}
		const exerciseId = props.route.params?.exerciseId;
		if (exerciseId) {
			router.navigate({
				pathname: "/course/exercise/[exerciseId]/start",
				params: {
					exerciseId,
				},
			});
			return;
		} else {
			router.navigate({
				pathname: "/tabs/home",
			});
			console.warn(
				"exerciseId Param Not Found on ExerciseScreenHeader, Falling to Home Screen",
			);
		}
	};

	return (
		<ScreenHeaderImpl.Root
			{...props}
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				paddingTop: spacing.md,
				paddingBottom: spacing.md,
			}}
		>
			<PressableScale onPress={handleClose}>
				<IconSax
					icon={CloseCircle}
					size={24}
					color={colors.palette.neutral800}
				/>
			</PressableScale>
			<Progress />
		</ScreenHeaderImpl.Root>
	);
};

const Progress = () => {
	const max = useExerciseStore((state) => state.progress.max);
	const curr = useExerciseStore((state) => Object.keys(state.results).length);
	const progress = (curr / max).toFixed(1);

	return <Exercise.ProgressBar progress={progress} />;
};

export default function ExerciseLayout() {
	return (
		<Stack
			screenOptions={{
				header: ExerciseScreenHeader,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					header: Header,
				}}
			/>
			<Stack.Screen name="start" />
		</Stack>
	);
}
