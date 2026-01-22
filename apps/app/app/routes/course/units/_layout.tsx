import { Stack } from "expo-router";
import { GoBack } from "@/components";

export default function CalculatorLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="[unitId]"
				options={{
					header: (props) => <GoBack tx="Chapters" {...props} />,
				}}
			/>
		</Stack>
	);
}
