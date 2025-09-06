/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { type ComponentProps, useEffect } from "react";
import {
	NavigationContainer,
	type NavigatorScreenParams,
	useNavigation,
} from "@react-navigation/native";
import {
	createNativeStackNavigator,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import * as Screens from "@/screens";
import Config from "../config";
import { useStores } from "../models";
import { DemoNavigator, type DemoTabParamList } from "./DemoNavigator";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { PortalProvider } from "@tamagui/portal";
import { defaultConfig } from "@tamagui/config/v4";
import { ResultRecord } from "@/components/quiz/QuizRender";
import { View } from "react-native";
import { Text } from "@/components";

const authStateXScreenMap = {
	login: "Login",
	register: "Registration",
	complete: "Welcome",
} as const;

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type CalculatorType = "SIP" | "SWP" | "MF" | "PPF";

export type AppStackParamList = {
	Welcome: undefined;
	Login: undefined;
	Registration: undefined;
	Demo: NavigatorScreenParams<DemoTabParamList>;
	Quiz: { quizId: number };
	QuizResult: {
		answers: ResultRecord;
		quizId: number;
	};

	Calculator: { type: CalculatorType };

	Calc_SIP: undefined;
	Calc_SWP: undefined;
	Calc_MF: undefined;
	Calc_PPF: undefined;
	Calc_EPF: undefined;
	Scam: { scamId: number };
	Lessons: undefined;
	Lesson: { lessonId: number };
};

export type ScreenProps<S extends keyof AppStackParamList> =
	AppStackScreenProps<S>;

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
	NativeStackScreenProps<AppStackParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const RootStack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
	const {
		authenticationStore: { isAuthenticated, currAuthState },
	} = useStores();

	const {
		theme: { colors },
	} = useAppTheme();

	const navigation = useNavigation();

	useEffect(() => {
		navigation.navigate(authStateXScreenMap[currAuthState]);
	}, [currAuthState]);

	return (
		<RootStack.Navigator
			screenOptions={{
				headerShown: false,
				navigationBarColor: colors.background,
				contentStyle: {
					backgroundColor: colors.background,
				},
			}}
			initialRouteName={isAuthenticated ? "Welcome" : "Login"}
		>
			{isAuthenticated ? (
				<>
					<RootStack.Screen name="Welcome" component={Screens.WelcomeScreen} />
					<RootStack.Screen name="Demo" component={DemoNavigator} />
					<RootStack.Screen name="Quizzes" component={Screens.QuizzesScreen} />
					<RootStack.Screen name="Quiz" component={Screens.QuizScreen} />
					<RootStack.Screen
						name="QuizResult"
						component={Screens.QuizResultScreen}
					/>

					{/* Calculators */}
					<RootStack.Screen name="Calc_SIP" component={Screens.SipCalcScreen} />
					<RootStack.Screen name="Calc_SWP" component={Screens.SwpCalcScreen} />
					<RootStack.Screen name="Calc_MF" component={Screens.MfCalcScreen} />
					<RootStack.Screen name="Calc_PPF" component={Screens.PpfCalcScreen} />
					<RootStack.Screen name="Calc_EPF" component={Screens.EpfCalcScreen} />
					<RootStack.Screen name="Scam" component={Screens.ScamScreen} />
					<RootStack.Screen name="Lessons" component={Screens.LessonsScreen} />
					<RootStack.Screen name="Lesson" component={Screens.LessonScreen} />

					<RootStack.Screen
						name="Calculator"
						component={Screens.CalculatorScreen}
					/>
				</>
			) : (
				<>
					<RootStack.Screen name="Login" component={Screens.LoginScreen} />
					<RootStack.Screen
						name="Registration"
						component={Screens.RegistrationScreen}
					/>
				</>
			)}
		</RootStack.Navigator>
	);
});

export interface NavigationProps
	extends Partial<
		ComponentProps<typeof NavigationContainer<AppStackParamList>>
	> {}

const config = createTamagui(defaultConfig);

export const AppNavigator = observer(function AppNavigator(
	props: NavigationProps,
) {
	const {
		themeScheme,
		navigationTheme,
		setThemeContextOverride,
		ThemeProvider,
	} = useThemeProvider();

	useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

	return (
		<TamaguiProvider config={config}>
			<ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
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
