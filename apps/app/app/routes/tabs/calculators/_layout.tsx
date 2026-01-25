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
							titleTx="screens:calculatorList.title"
							tagLineTx="screens:calculatorList.tagLine"
							{...props}
						/>
					),
				}}
			/>
		</Stack>
	);
}
