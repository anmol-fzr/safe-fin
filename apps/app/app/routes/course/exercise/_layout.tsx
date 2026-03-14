import { Stack } from "expo-router";

export default function ExerciseLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="[exerciseId]" />
		</Stack>
	);
}
