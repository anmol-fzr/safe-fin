import {
	createNativeStackNavigator,
	type NativeStackNavigationProp,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ScreenHeader } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import type { ResourceId } from "@/types";
import * as Screens from "./screens";

export type CalculatorStackParamList = {
	CalculatorList: undefined;
	Calculator: { id: ResourceId };
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
export const calculatorTabHiddenScreens: Array<keyof CalculatorStackParamList> =
	[];
//["Calculator"];

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
				options={{
					headerShown: true,
					header: (props) => {
						return (
							<ScreenHeader
								titleTx="calculatorListScreen:title"
								tagLineTx="calculatorListScreen:tagLine"
								{...props}
							/>
						);
					},
				}}
				component={Screens.CalculatorListScreen}
			/>
			<Stack.Screen name="Calculator" component={Screens.CalculatorScreen} />
		</Stack.Navigator>
	);
}
