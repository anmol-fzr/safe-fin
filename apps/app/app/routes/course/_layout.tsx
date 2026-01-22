import { Stack } from "expo-router";
import { GoBack } from "@/components";

export default function CourseLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="[courseId]"
				options={{
					header: (props) => <GoBack tx="tabs:learnings" {...props} />,
				}}
			/>

			<Stack.Screen
				name="units"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
