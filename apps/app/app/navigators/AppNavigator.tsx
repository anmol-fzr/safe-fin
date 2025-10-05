import {
	NavigationContainer,
	type NavigatorScreenParams,
} from "@react-navigation/native";
import {
	createNativeStackNavigator,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { PortalProvider } from "@tamagui/portal";
import { observer } from "mobx-react-lite";
import type { ComponentProps } from "react";
import {
	AuthNavigator,
	type AuthStackParamList,
} from "@/modules/auth/navigator";
import { RegisterScreen } from "@/modules/auth/screen";
import { useAuthStore } from "@/modules/auth/store";
import { authClient } from "@/modules/auth/utils";
import {
	QuizNavigator,
	type QuizStackParamList,
} from "@/modules/quiz/navigator";
import * as Screens from "@/screens";
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme";
import Config from "../config";
import { MainTabNavigator, type MainTabParamList } from "./MainTabNavigator";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";

export type CalculatorType = "SIP" | "SWP" | "MF" | "PPF";

export type AppStackParamList = {
	Auth: NavigatorScreenParams<AuthStackParamList>;

	Welcome: undefined;
	MainTabs: NavigatorScreenParams<MainTabParamList>;
	Quiz: NavigatorScreenParams<QuizStackParamList>;
	Test: undefined;
};

export type ScreenProps<S extends keyof AppStackParamList> =
	AppStackScreenProps<S>;

const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
	NativeStackScreenProps<AppStackParamList, T>;

const RootStack = createNativeStackNavigator<AppStackParamList>();

function AppStack() {
	const isAuthenticated = !!authClient.getCookie();
	// useAuthStore((state) => state.isLogin);

	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<RootStack.Navigator
			screenOptions={{
				headerShown: false,
				navigationBarColor: colors.background,
				contentStyle: {
					backgroundColor: colors.background,
				},
			}}
			initialRouteName={isAuthenticated ? "Welcome" : "Auth"}
			//initialRouteName="Test"
		>
			<RootStack.Screen name="Test" component={RegisterScreen} />
			<RootStack.Screen name="Welcome" component={Screens.WelcomeScreen} />
			{isAuthenticated ? (
				<>
					<RootStack.Screen name="MainTabs" component={MainTabNavigator} />
					<RootStack.Screen name="Quiz" component={QuizNavigator} />
				</>
			) : (
				<RootStack.Screen name="Auth" component={AuthNavigator} />
			)}
			{/*
			 */}
		</RootStack.Navigator>
	);
}

export interface NavigationProps
	extends Partial<
		ComponentProps<typeof NavigationContainer<AppStackParamList>>
	> {}

const config = createTamagui(defaultConfig);

export const AppNavigator = observer(function AppNavigator(
	props: NavigationProps,
) {
	const {
		//themeScheme,
		navigationTheme,
		setThemeContextOverride,
		ThemeProvider,
	} = useThemeProvider();

	useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

	return (
		<TamaguiProvider config={config}>
			<ThemeProvider value={{ themeScheme: "light", setThemeContextOverride }}>
				<NavigationContainer
					ref={navigationRef}
					theme={navigationTheme}
					{...props}
				>
					<Screens.ErrorBoundary catchErrors={Config.catchErrors}>
						<PortalProvider shouldAddRootHost>
							<AppStack />
						</PortalProvider>
					</Screens.ErrorBoundary>
				</NavigationContainer>
			</ThemeProvider>
		</TamaguiProvider>
	);
});
