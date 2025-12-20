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
							titleTx="screens:scamList.title"
							tagLineTx="screens:scamList.tagLine"
							{...props}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="[scamId]"
				options={{
					header: (props) => <GoBack tx="screens:scamList.title" {...props} />,
				}}
			/>
		</Stack>
	);
}
