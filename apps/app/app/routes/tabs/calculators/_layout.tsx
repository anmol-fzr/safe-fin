import { Stack } from "expo-router";
import { GoBack, ScreenHeader } from "@/components";

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
			<Stack.Screen
				name="[id]"
				options={{
					header: (props) => (
						<GoBack tx="calculatorListScreen:title" {...props} />
					),
				}}
			/>
		</Stack>
	);
}
