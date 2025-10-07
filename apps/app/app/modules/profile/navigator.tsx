import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
	createNativeStackNavigator,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import * as Screens from "./screens";

export type ProfileStackParamList = {
	Index: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
	NativeStackScreenProps<ProfileStackParamList, T>;

const Stack = createNativeStackNavigator<ProfileStackParamList>();

type NavigationProp = NativeStackNavigationProp<
	ProfileStackParamList,
	keyof ProfileStackParamList
>;

export const useProfileNavigation = useSafeNavigation<NavigationProp>;

export function ProfileNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Index"
		>
			<Stack.Screen name="Index" component={Screens.ProfileScreen} />
		</Stack.Navigator>
	);
}
