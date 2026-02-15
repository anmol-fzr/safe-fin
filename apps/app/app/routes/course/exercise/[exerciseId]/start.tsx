import { Screen } from "@/components";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { useGetExercise } from "@/modules/exercise/hooks/queries";
import { useNavigation } from "expo-router";
import { Suspense, useLayoutEffect } from "react";
import z from "zod";
import { ExerciseDetailScreen } from "@/modules/exercise/screen";

const schema = z.object({
	exerciseId: z.coerce.number(),
});

const useExerciseScreenParams = () => {
	return useTypedLocalSearchParams(schema);
};

export default function ExerciseScreen() {
	const params = useExerciseScreenParams();
	const { exerciseId } = params;

	const { exercise } = useGetExercise(exerciseId);
	const navigation = useNavigation();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: exercise.chapter.course.content.title,
		});
	}, []);

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={{ flex: 1 }}
			safeAreaEdges={["bottom"]}
		>
			<Suspense fallback={<ExerciseDetailScreen.Loading />}>
				<ExerciseDetailScreen {...params} />
			</Suspense>
		</Screen>
	);
}
