import { Stack } from "expo-router";
import { GoBack, ScreenHeader } from "@/components";

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
			<Stack.Screen
				name="[scamId]"
				options={{
					header: (props) => <GoBack tx="scamScreen:title" {...props} />,
				}}
			/>
		</Stack>
	);
}
