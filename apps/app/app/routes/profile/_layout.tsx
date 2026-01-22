import { GoBack } from "@/components";
import { Stack } from "expo-router";

export default function SavedLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="public"
				options={{
					header: (props) => <GoBack tx="profileScreen:title" {...props} />,
				}}
			/>

			<Stack.Screen
				name="edit"
				options={{
					header: (props) => <GoBack tx="Public Profile" {...props} />,
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
