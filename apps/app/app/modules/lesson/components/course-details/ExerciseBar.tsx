import { Link } from "expo-router";
import type { Exercise } from "../../api-types/course_one";
import { usePrefetchExercise } from "@/modules/exercise/hooks/queries";
import { ItemCard } from "../ItemCard";
import { Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import { toast } from "sonner-native";

type ExerciseProps = {
	exercise: Exercise;
};

export const ExerciseBar = (props: ExerciseProps) => {
	const { exercise } = props;

	const { id, title, points, status } = exercise;

	const { prefetchExercise } = usePrefetchExercise();

	function handlePrefetchExercise() {
		prefetchExercise(id);
	}

	const handleLockedPress = () => {
		toast.error("Locked !!", { richColors: false });
		//Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
	};
	console.info({ status });

	return status === "LOCKED" ? (
		<Pressable onPress={handleLockedPress}>
			<ItemCard {...{ title, points, status }} />
		</Pressable>
	) : (
		<Link
			onPressIn={handlePrefetchExercise}
			href={{
				pathname: "/course/exercise/[exerciseId]/start",
				params: {
					exerciseId: id,
				},
			}}
		>
			<ItemCard {...{ title, points, status }} />
		</Link>
	);
};
