import { GoBack, ScreenHeader } from "@/components";
import { Stack } from "expo-router";
import { ProfileScreenHeader } from "../tabs/profile/_layout";

export default function SavedLayout() {
	return (
		<Stack screenOptions={{ header: ProfileScreenHeader }}>
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

			<Stack.Screen name="demographics" />
			<Stack.Screen name="financials" />
			<Stack.Screen name="account" />
		</Stack>
	);
}
