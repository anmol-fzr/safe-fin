import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
	createNativeStackNavigator,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ScreenHeader } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import * as Screens from "./screens";

export type ScamStackParamList = {
	ScamList: undefined;
	Scam: { scamId: number };
};

export type ScamStackScreenProps<T extends keyof ScamStackParamList> =
	NativeStackScreenProps<ScamStackParamList, T>;

const Stack = createNativeStackNavigator<ScamStackParamList>();

type NavigationProp = NativeStackNavigationProp<
	ScamStackParamList,
	keyof ScamStackParamList
>;

export const useScamNavigation = useSafeNavigation<NavigationProp>;

export function ScamNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="ScamList"
		>
			<Stack.Screen
				name="ScamList"
				component={Screens.ScamListScreen}
				options={{
					headerShown: true,
					header: (props) => {
						return (
							<ScreenHeader
								titleTx="scamScreen:title"
								tagLineTx="scamScreen:tagLine"
								{...props}
							/>
						);
					},
				}}
			/>
			<Stack.Screen name="Scam" component={Screens.ScamScreen} />
		</Stack.Navigator>
	);
}
