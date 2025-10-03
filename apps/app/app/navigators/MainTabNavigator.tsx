import { HomeScreen } from "@home/screens";
import {
	type BottomTabScreenProps,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import {
	BookOpenIcon,
	CalculatorIcon,
	HomeIcon,
	ShieldIcon,
	UserIcon,
} from "lucide-react-native";
import type { TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabIcon } from "@/components/navigation/TabIcon";
import { t } from "@/i18n";
import { CalculatorNavigator } from "@/modules/Calculator/navigator";
import { LessonNavigator } from "@/modules/lesson/navigator";
import { ScamNavigator } from "@/modules/scam/navigator";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { ProfileScreen } from "../screens";
import type { AppStackParamList, AppStackScreenProps } from "./AppNavigator";

export type MainTabParamList = {
	Home: undefined;
	Profile: undefined;
	Scams: undefined;
	Lesson: undefined;
	Calculator: undefined;
};

const translate = t("mainNavigator").bind(null);
const showTabBarLabel = false;
const tabBarLabel = showTabBarLabel ? translate.bind(null) : () => "";

export type MainTabScreenProps<T extends keyof MainTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<MainTabParamList, T>,
		AppStackScreenProps<keyof AppStackParamList>
	>;

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
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
					tabBarAccessibilityLabel: translate("homeTab"),
					tabBarLabel: tabBarLabel("homeTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={HomeIcon} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Calculator"
				component={CalculatorNavigator}
				options={{
					tabBarAccessibilityLabel: translate("calculatorListTab"),
					tabBarLabel: tabBarLabel("calculatorListTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={CalculatorIcon} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Lesson"
				component={LessonNavigator}
				options={{
					tabBarAccessibilityLabel: translate("learnTab"),
					tabBarLabel: tabBarLabel("learnTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={BookOpenIcon} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Scams"
				component={ScamNavigator}
				options={{
					tabBarAccessibilityLabel: translate("scamTab"),
					tabBarLabel: tabBarLabel("scamTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={ShieldIcon} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarAccessibilityLabel: translate("profileTab"),
					tabBarLabel: tabBarLabel("profileTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={UserIcon} focused={focused} />
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
						tabBarLabel: translate("mainNavigator:debugTab"),
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
