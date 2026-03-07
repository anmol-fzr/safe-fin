import { Stack } from "expo-router";
import { ProfileScreenHeader } from "../tabs/profile/_layout";

export default function SavedLayout() {
	return (
		<Stack
			screenOptions={{
				header: ProfileScreenHeader,
				animation: "slide_from_left",
			}}
		>
			<Stack.Screen name="public" />
			<Stack.Screen name="edit" />
			<Stack.Screen name="demographics" />
			<Stack.Screen name="financials" />
			<Stack.Screen name="account" />
		</Stack>
	);
}
