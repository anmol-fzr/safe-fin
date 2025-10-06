import {
	createNativeStackNavigator,
	type NativeStackNavigationProp,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
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

type NavigationProp = NativeStackNavigationProp<
	CalculatorStackParamList,
	keyof CalculatorStackParamList
>;

export const useCalculatorNavigation = useSafeNavigation<NavigationProp>;

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
