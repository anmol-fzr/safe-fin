import { Stack } from "expo-router";
import { ScreenHeader } from "@/components";

export default function CalculatorLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					header: (props) => (
						<ScreenHeader
							titleTx="calculatorListScreen:title"
							tagLineTx="calculatorListScreen:tagLine"
							{...props}
						/>
					),
				}}
			/>
		</Stack>
	);
}
