import {
	type BottomTabScreenProps,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import { SettingsService } from "better-auth/client/plugins";

import {
	BookOpenIcon,
	CalculatorIcon,
	HomeIcon,
	ShieldIcon,
	UserIcon,
} from "lucide-react-native";
import type { TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { translate } from "@/i18n";
import { HomeScreen } from "@/screens/HomeScreen";
import { LearningScreen } from "@/screens/lesson";
import type { ThemedStyle } from "@/theme";
import { envs } from "@/utils/envs";
import { useAppTheme } from "@/utils/useAppTheme";
import { Icon } from "../components";
import {
	CalculatorListScreen,
	DemoDebugScreen,
	ProfileScreen,
	ScamsScreen,
	SettingScreen,
} from "../screens";
import type { AppStackParamList, AppStackScreenProps } from "./AppNavigator";

export type DemoTabParamList = {
	Profile: undefined;
	Scams: undefined;
	Learning: undefined;
	DemoDebug: undefined;
	CalculatorList: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<DemoTabParamList, T>,
		AppStackScreenProps<keyof AppStackParamList>
	>;

const Tab = createBottomTabNavigator<DemoTabParamList>();

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 */
export function DemoNavigator() {
	const { bottom } = useSafeAreaInsets();
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
				tabBarActiveTintColor: colors.text,
				tabBarInactiveTintColor: colors.text,
				tabBarLabelStyle: themed($tabBarLabel),
				tabBarItemStyle: themed($tabBarItem),
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarAccessibilityLabel: translate("navigator:homeTab"),
					tabBarLabel: translate("navigator:homeTab"),
					tabBarIcon: ({ focused }) => (
						<HomeIcon
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="CalculatorList"
				component={SettingScreen}
				options={{
					tabBarLabel: translate("navigator:calculatorListTab"),
					tabBarIcon: ({ focused }) => (
						<CalculatorIcon
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Learning"
				component={LearningScreen}
				options={{
					tabBarLabel: translate("navigator:learnTab"),
					tabBarIcon: ({ focused }) => (
						<BookOpenIcon
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Scams"
				component={ScamsScreen}
				options={{
					tabBarLabel: translate("demoNavigator:scamTab"),
					tabBarIcon: ({ focused }) => (
						<ShieldIcon
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarLabel: translate("navigator:profileTab"),
					tabBarIcon: ({ focused }) => (
						<UserIcon
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			{/* TODO: Move this Debug Screen to Settings or Profile Screen */}
			{/*
			{envs.isDev && (
				<Tab.Screen
					name="DemoDebug"
					component={DemoDebugScreen}
					options={{
						tabBarLabel: translate("demoNavigator:debugTab"),
						tabBarIcon: ({ focused }) => (
							<Icon
								icon="debug"
								color={focused ? colors.tint : colors.tintInactive}
								size={30}
							/>
						),
					}}
				/>
			)}
      */}
		</Tab.Navigator>
	);
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
	backgroundColor: colors.background,
	borderTopColor: colors.transparent,
});

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingTop: spacing.md,
});

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
	fontSize: 12,
	fontFamily: typography.primary.medium,
	lineHeight: 16,
	color: colors.text,
});
