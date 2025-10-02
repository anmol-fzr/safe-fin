import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { AppStackParamList } from "@/navigators";

type NavigationProp = NativeStackNavigationProp<
	AppStackParamList,
	keyof AppStackParamList
>;

export function useSafeNavigation() {
	const navigation = useNavigation<NavigationProp>();

	return navigation;
}
