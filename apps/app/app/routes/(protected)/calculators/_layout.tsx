import { Stack } from "expo-router";
import { GoBack } from "@/components";

export default function CalculatorLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="[calculatorId]"
				options={{
					header: (props) => (
						<GoBack tx="screens:calculatorList.title" {...props} />
					),
				}}
			/>
		</Stack>
	);
}
