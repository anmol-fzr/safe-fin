import { useGetExercise } from "@/modules/exercise/hooks/queries";
import { useNavigation } from "expo-router";
import { Suspense, useLayoutEffect } from "react";
import z from "zod";
import { ExerciseDetailScreen } from "@/modules/exercise/screen";
import { createRoute } from "@/factory/route";
import { idSchema } from "@/schema";

const paramSchema = z.object({
	exerciseId: idSchema,
});

const Route = createRoute({
	paramSchema,
});

export default function ExerciseScreen() {
	const params = Route.useParams();
	const { exerciseId } = params;

	const { exercise } = useGetExercise(exerciseId);
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: exercise.chapter.course.content.title,
		});
	}, []);

	return (
		<Route.Screen>
			<Suspense fallback={<ExerciseDetailScreen.Loading />}>
				<ExerciseDetailScreen exerciseId={exerciseId} />
			</Suspense>
		</Route.Screen>
	);
}
