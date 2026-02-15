import { Link } from "expo-router";
import { Play, TickCircle } from "iconsax-react-nativejs";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/Text";
import { IconSax } from "@/context/IconContext";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Exercise } from "../../api-types/course_one";
import { usePrefetchExercise } from "@/modules/exercise/hooks/queries";

type ExerciseProps = {
	exercise: Exercise;
};

export const ExerciseBar = (props: ExerciseProps) => {
	const { exercise } = props;

	const { id, title } = exercise;
	const isCompleted = 0;

	const {
		theme: { colors },
	} = useAppTheme();

	const { prefetchExercise } = usePrefetchExercise();

	function handlePrefetchExercise() {
		prefetchExercise(id);
	}

	return (
		<Link
			onPressIn={handlePrefetchExercise}
			href={{
				pathname: "/course/exercise/[exerciseId]/start",
				params: {
					exerciseId: id,
				},
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: 12,
					borderWidth: 1,
					backgroundColor: colors.palette.neutral200,
					borderColor: isCompleted ? colors.success : colors.palette.neutral200,
					borderRadius: 12,
				}}
			>
				{/*
				<View style={styles.iconWrapper}>
					<Image
						source={{
							uri: "https://img.icons8.com/color/96/design.png",
						}}
						style={styles.icon}
					/>
				</View>
        */}
				<View style={styles.textWrapper}>
					<Text weight="medium" size="sm">
						{title}
					</Text>

					{/*
					<View style={{ flexDirection: "row", gap: spacing.md }}>
						<Text style={{ color: colors.textDim }} size="xs" weight="semiBold">
							{points} PX
						</Text>
						{isCompleted === 1 && <CourseCompleteBadge />}
					</View>
          */}
				</View>

				{isCompleted === 1 ? (
					<IconSax icon={TickCircle} color={colors.success} />
				) : (
					<IconSax icon={Play} color={colors.tint} />
				)}
			</View>
		</Link>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 12,
	},
	// iconWrapper: {
	// 	width: 48,
	// 	height: 48,
	// 	backgroundColor: "#F5F5F5",
	// 	borderRadius: 8,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	marginRight: 12,
	// },
	// icon: {
	// 	width: 24,
	// 	height: 24,
	// },
	textWrapper: {
		flex: 1,
		marginRight: 16,
	},
});
