import {
	createNativeStackNavigator,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as Screens from "./screen";

export type AuthStackParamList = {
	Login: undefined;
	Register: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> =
	NativeStackScreenProps<AuthStackParamList, T>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Login"
		>
			<Stack.Screen name="Login" component={Screens.LoginScreen} />
			<Stack.Screen name="Register" component={Screens.RegisterScreen} />
		</Stack.Navigator>
	);
}
