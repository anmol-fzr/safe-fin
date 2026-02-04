import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import { translate } from "@/i18n";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useAppTheme } from "@/utils/useAppTheme";

function TabIcon({
	focused,
	source,
	selectedSource,
	color,
}: {
	focused: boolean;
	source: number;
	selectedSource?: number;
	color: string;
}) {
	return (
		<Image
			source={focused && selectedSource ? selectedSource : source}
			style={{
				marginBottom: 4,
				width: 22,
				height: 22,
				tintColor: color,
			}}
			resizeMode="contain"
		/>
	);
}

export default function TabsLayout() {
	const { isLogin } = useAuth();
	const { navigate } = useRouter();

	useEffect(() => {
		if (!isLogin) {
			navigate("/auth/login");
		}
	}, [isLogin, navigate]);

	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.palette.accent500,
				tabBarInactiveTintColor: colors.palette.neutral500,
				tabBarStyle: {
					backgroundColor: colors.palette.neutral200,
				},
				tabBarLabelStyle: {
					fontSize: 12,
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: translate("tabs:home"),
					tabBarIcon: (props) => (
						<TabIcon
							{...props}
							source={require("../../../assets/tabs/icons/home.png")}
							selectedSource={require("../../../assets/tabs/icons/home-selected.png")}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="calculators"
				options={{
					title: translate("tabs:calculator"),
					tabBarIcon: (props) => (
						<TabIcon
							{...props}
							source={require("../../../assets/tabs/icons/calculator.png")}
							selectedSource={require("../../../assets/tabs/icons/calculator-selected.png")}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="learnings"
				options={{
					title: translate("tabs:learnings"),
					tabBarIcon: (props) => (
						<TabIcon
							{...props}
							source={require("../../../assets/tabs/icons/book.png")}
							selectedSource={require("../../../assets/tabs/icons/book-selected.png")}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="scams"
				options={{
					href: null,
					title: translate("tabs:scams"),
					tabBarIcon: (props) => (
						<TabIcon
							{...props}
							source={require("../../../assets/tabs/icons/shield.png")}
							selectedSource={require("../../../assets/tabs/icons/shield-selected.png")}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: translate("tabs:profile"),
					tabBarIcon: (props) => (
						<TabIcon
							{...props}
							source={require("../../../assets/tabs/icons/user.png")}
							selectedSource={require("../../../assets/tabs/icons/user-selected.png")}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

// import { useRouter } from "expo-router";
// import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
// import { useEffect } from "react";
// import { translate } from "@/i18n";
// import { useAuth } from "@/modules/auth/hooks/useAuth";
// import { useAppTheme } from "@/utils/useAppTheme";
//
// export default function TabsLayout() {
// 	const { isLogin } = useAuth();
// 	const { navigate } = useRouter();
//
// 	useEffect(() => {
// 		if (!isLogin) {
// 			navigate("/auth/login");
// 		}
// 	}, [isLogin, navigate]);
//
// 	const {
// 		theme: { colors },
// 	} = useAppTheme();
//
// 	return (
// 		<NativeTabs
// 			labelVisibilityMode="labeled"
// 			backgroundColor={colors.palette.neutral200}
// 			indicatorColor={colors.palette.accent200}
// 			iconColor={{
// 				default: colors.palette.neutral500,
// 				selected: colors.palette.accent500,
// 			}}
// 			tintColor={colors.palette.accent500}
// 		>
// 			<NativeTabs.Trigger name="home">
// 				<Label>{translate("tabs:home")}</Label>
// 				<Icon src={require("../../../assets/tabs/icons/home.png")} />
// 			</NativeTabs.Trigger>
//
// 			{/*
// 			<NativeTabs.Trigger name="home">
// 				<Label>{translate("tabs:home")}</Label>
// 				<Icon
// 					src={{
// 						default: require("../../../assets/tabs/icons/home.png"),
// 						selected: require("../../../assets/tabs/icons/home-selected.png"),
// 					}}
// 				/>
// 			</NativeTabs.Trigger>
//       */}
//
// 			<NativeTabs.Trigger name="calculators">
// 				<Label>{translate("tabs:calculator")}</Label>
// 				<Icon
// 					src={{
// 						default: require("../../../assets/tabs/icons/calculator.png"),
// 						selected: require("../../../assets/tabs/icons/calculator-selected.png"),
// 					}}
// 				/>
// 			</NativeTabs.Trigger>
//
// 			<NativeTabs.Trigger name="learnings">
// 				<Label>{translate("tabs:learnings")}</Label>
// 				<Icon
// 					src={{
// 						default: require("../../../assets/tabs/icons/book.png"),
// 						selected: require("../../../assets/tabs/icons/book-selected.png"),
// 					}}
// 				/>
// 			</NativeTabs.Trigger>
//
// 			<NativeTabs.Trigger name="scams">
// 				<Label>{translate("tabs:scams")}</Label>
// 				<Icon
// 					src={{
// 						default: require("../../../assets/tabs/icons/shield.png"),
// 						selected: require("../../../assets/tabs/icons/shield-selected.png"),
// 					}}
// 				/>
// 			</NativeTabs.Trigger>
//
// 			<NativeTabs.Trigger name="profile">
// 				<Label>{translate("tabs:profile")}</Label>
// 				<Icon
// 					src={{
// 						default: require("../../../assets/tabs/icons/user.png"),
// 						selected: require("../../../assets/tabs/icons/user-selected.png"),
// 					}}
// 				/>
// 			</NativeTabs.Trigger>
// 		</NativeTabs>
// 	);
// }
