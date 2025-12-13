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
							titleTx="learningScreen:title"
							tagLineTx="learningScreen:tagLine"
							{...props}
						/>
					),
				}}
			/>

			<Stack.Screen
				name="[lessonId]"
				options={{
					header: (props) => <GoBack tx="lessonScreen:title" {...props} />,
				}}
			/>
		</Stack>
	);
}
