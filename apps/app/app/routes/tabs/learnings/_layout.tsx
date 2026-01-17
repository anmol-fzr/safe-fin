import { Link, Stack } from "expo-router";
import { GoBack, ScreenHeader } from "@/components";

export default function CalculatorLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					header: (props) => (
						<ScreenHeader
							titleTx="screens:learningList.title"
							tagLineTx="screens:learningList.tagLine"
							{...props}
						/>
					),
				}}
			/>

			<Stack.Screen
				name="[lessonId]"
				options={{
					header: (props) => (
						<GoBack tx="screens:learningList.title" {...props} />
					),
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
