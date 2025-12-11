import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header, Text } from "@/components";
import { Provider } from "@/components/Provider";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useAuthStore } from "@/modules/auth/store";
import { colors } from "@/theme";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	const { isLogin } = useAuth();
	const { top } = useSafeAreaInsets();

	return (
		<Provider>
			<Stack screenOptions={{ headerShown: false }}>
				{/* <Stack.Protected guard={!isLogin}> */}
				<Stack.Screen
					name="index"
					options={{
						headerShown: true,
						header: () => <Header titleTx="loginScreen:title" />,
						// header: () => (
						// 	<View
						// 		style={{ marginTop: top, backgroundColor: colors.background }}
						// 	>
						// 		<Text tx="loginScreen:title" preset="heading" />
						// 		<Text tx="loginScreen:tagLine" />
						// 	</View>
						// ),
					}}
				/>
				{/* </Stack.Protected> */}
			</Stack>
		</Provider>
	);
}
