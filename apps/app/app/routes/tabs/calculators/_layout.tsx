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
							titleTx="screens:calculatorList.title"
							tagLineTx="screens:calculatorList.tagLine"
							{...props}
						/>
					),
				}}
			/>
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
