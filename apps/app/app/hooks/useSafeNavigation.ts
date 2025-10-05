import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { AppStackParamList } from "@/navigators";

type NavigationProp = NativeStackNavigationProp<
	AppStackParamList,
	keyof AppStackParamList
>;

export function useSafeNavigation<T = NavigationProp>() {
	const navigation = useNavigation<T>();

	return navigation;
}
