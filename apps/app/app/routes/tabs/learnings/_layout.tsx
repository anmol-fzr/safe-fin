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
							titleTx="learningScreen:title"
							tagLineTx="learningScreen:tagLine"
							{...props}
						/>
					),
				}}
			/>
		</Stack>
	);
}
