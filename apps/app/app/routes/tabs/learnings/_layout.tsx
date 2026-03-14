import { Stack } from "expo-router";
import { ScreenHeader } from "@/components";

export default function LearningsLayout() {
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
				name="units"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
