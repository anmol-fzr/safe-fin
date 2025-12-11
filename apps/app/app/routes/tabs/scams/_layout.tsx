import { Stack } from "expo-router";
import { ScreenHeader } from "@/components";

export default function ScamsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					header: (props) => (
						<ScreenHeader
							titleTx="scamScreen:title"
							tagLineTx="scamScreen:tagLine"
							{...props}
						/>
					),
				}}
			/>
		</Stack>
	);
}
