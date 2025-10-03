import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as Screens from "./screens";

type CalculatorType = string;

export type CalculatorStackParamList = {
	CalculatorList: undefined;
	Calculator: { type: CalculatorType };
};

export type CalculatorStackScreenProps<
	T extends keyof CalculatorStackParamList,
> = NativeStackScreenProps<CalculatorStackParamList, T>;

const Stack = createNativeStackNavigator<CalculatorStackParamList>();

export function CalculatorNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="CalculatorList"
		>
			<Stack.Screen
				name="CalculatorList"
				component={Screens.CalculatorListScreen}
			/>
			<Stack.Screen name="Calculator" component={Screens.CalculatorScreen} />
		</Stack.Navigator>
	);
}
