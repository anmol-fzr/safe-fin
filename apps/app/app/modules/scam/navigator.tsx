import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as Screens from "./screens";

export type ScamStackParamList = {
	ScamList: undefined;
	Scam: { scamId: number };
};

export type ScamStackScreenProps<T extends keyof ScamStackParamList> =
	NativeStackScreenProps<ScamStackParamList, T>;

const Stack = createNativeStackNavigator<ScamStackParamList>();

export function ScamNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="ScamList"
		>
			<Stack.Screen name="ScamList" component={Screens.ScamListScreen} />
			<Stack.Screen name="Scam" component={Screens.ScamScreen} />
		</Stack.Navigator>
	);
}
