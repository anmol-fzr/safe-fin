import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Stack } from "expo-router";
import { GoBack, ScreenHeader } from "@/components";

const ProfileScreenHeader = (props: NativeStackHeaderProps) => {
	return <GoBack tx="profileScreen:title" {...props} />;
};

export default function ProfileLayout() {
	return (
		<Stack screenOptions={{ header: ProfileScreenHeader }}>
			<Stack.Screen
				name="index"
				options={{
					header: (props) => (
						<ScreenHeader
							titleTx="profileScreen:title"
							tagLineTx="profileScreen:tagLine"
							{...props}
						/>
					),
				}}
			/>

			<Stack.Screen name="account" />
			<Stack.Screen name="debug" />
			<Stack.Screen name="demographics" />
			<Stack.Screen name="financials" />
			<Stack.Screen name="settings" />
			<Stack.Screen name="user-profile" />
		</Stack>
	);
}
