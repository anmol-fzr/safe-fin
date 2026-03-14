import { Stack } from "expo-router";
import { ProfileScreenHeader } from "../tabs/profile/_layout";

export default function SavedLayout() {
	return (
		<Stack screenOptions={{ header: ProfileScreenHeader }}>
			<Stack.Screen name="index" />
		</Stack>
	);
}
