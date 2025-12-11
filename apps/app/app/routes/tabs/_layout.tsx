import { useRouter } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useEffect } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useAppTheme } from "@/utils/useAppTheme";

export default function TabsLayout() {
	const { isLogin } = useAuth();
	const { navigate } = useRouter();

	useEffect(() => {
		if (!isLogin) {
			navigate("/auth");
		}
	}, [isLogin, navigate]);

	const {
		theme: { colors },
		themeContext,
	} = useAppTheme();
	console.log({ themeContext });

	return (
		<NativeTabs
			labelVisibilityMode="labeled"
			backgroundColor={colors.background}
			//backgroundColor={colors.palette.neutral100}
			labelStyle={{
				default: colors.palette.neutral500,
				selected: colors.palette.accent500,
			}}
			indicatorColor={colors.palette.accent200}
			iconColor={{
				default: colors.palette.neutral500,
				selected: colors.palette.accent500,
			}}
			tintColor={colors.palette.accent500}

			//backgroundColor={theme.colors.background}
			// tintColor={colors.palette.accent500}
		>
			<NativeTabs.Trigger name="index">
				<Label>Home</Label>
				<Icon
					src={{
						default: require("../../../assets/tabs/icons/home.png"),
						selected: require("../../../assets/tabs/icons/home-selected.png"),
					}}
				/>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="calculators">
				<Label>Calculator</Label>
				<Icon
					src={{
						default: require("../../../assets/tabs/icons/calculator.png"),
						selected: require("../../../assets/tabs/icons/calculator-selected.png"),
					}}
				/>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="learnings">
				<Label>Learnings</Label>
				<Icon
					src={{
						default: require("../../../assets/tabs/icons/book.png"),
						selected: require("../../../assets/tabs/icons/book-selected.png"),
					}}
				/>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="scams">
				<Label>Scams</Label>
				<Icon
					src={{
						default: require("../../../assets/tabs/icons/shield.png"),
						selected: require("../../../assets/tabs/icons/shield-selected.png"),
					}}
				/>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="profile">
				<Label>Profile</Label>
				<Icon
					src={{
						default: require("../../../assets/tabs/icons/user.png"),
						selected: require("../../../assets/tabs/icons/user-selected.png"),
					}}
				/>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
