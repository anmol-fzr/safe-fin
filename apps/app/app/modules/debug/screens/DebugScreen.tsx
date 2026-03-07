import * as Application from "expo-application";
import { useMemo } from "react";
import {
	Linking,
	Platform,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import { Button, ListItem, ListView, Screen, Text } from "@/components";
import { isRTL } from "@/i18n";
import { useAuthStore } from "@/modules/auth/store";
import { logout } from "@/modules/auth/utils";
import type { ThemedStyle } from "@/theme";
import { $styles } from "@/theme";
import { envs } from "@/utils/envs";
import { useAppTheme } from "@/utils/useAppTheme";

type T = Record<string, string | boolean | Record<string, string | boolean>>;

function traverseObj(obj: T) {
	const o: { label: string; value: string }[] = [];

	Object.entries(obj).map(([key, value]) => {
		if (typeof value === "object") {
			const j = traverseObj(value);
			o.push(...j);
		}
		o.push({
			label: key,
			value: value.toString(),
		});
	});
	return o;
}

function openLinkInBrowser(url: string) {
	Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

const usingHermes =
	typeof HermesInternal === "object" && HermesInternal !== null;

export function DebugScreen() {
	const { themeContext, themed, actualTheme } = useAppTheme();
	const resetAuthData = useAuthStore((state) => state.resetData);
	const user = useAuthStore((state) => state.user);

	const envsDataList = traverseObj(envs);
	// @ts-expect-error
	const usingFabric = global.nativeFabricUIManager != null;

	const demoReactotron = useMemo(
		() => async () => {
			if (__DEV__) {
				console.tron.display({
					name: "DISPLAY",
					value: {
						appId: Application.applicationId,
						appName: Application.applicationName,
						appVersion: Application.nativeApplicationVersion,
						appBuildVersion: Application.nativeBuildVersion,
						hermesEnabled: usingHermes,
					},
					important: true,
				});
			}
		},
		[],
	);

	const appDataList = useMemo(
		() => [
			{
				label: "App Id",
				value: Application.applicationId,
			},
			{
				label: "App Name",
				value: Application.applicationName,
			},
			{
				label: "App Version",
				value: Application.nativeApplicationVersion,
			},
			{
				label: "App Build Version",
				value: Application.nativeBuildVersion,
			},
			{
				label: "Hermes Enabled",
				value: String(usingHermes),
			},
			{
				label: "App Build Version",
				value: String(usingFabric),
			},
		],
		[usingFabric],
	);

	const userDataList = useMemo(
		() => [
			{
				label: "User Id",
				value: user?.id,
			},
			{
				label: "User Email",
				value: user?.email,
			},
		],
		[user],
	);

	return (
		<Screen
			preset="scroll"
			safeAreaEdges={["top"]}
			contentContainerStyle={[$styles.container, themed($container)]}
		>
			<Text
				style={themed($reportBugsLink)}
				tx="demoDebugScreen:reportBugs"
				onPress={() =>
					openLinkInBrowser("https://github.com/infinitered/ignite/issues")
				}
			/>

			<Text
				style={themed($title)}
				preset="heading"
				tx="demoDebugScreen:title"
			/>
			<Text preset="bold">Current system theme: {actualTheme}</Text>
			<Text preset="bold">Current app theme: {themeContext}</Text>

			<View style={themed($itemsContainer)}>
				<Button onPress={resetAuthData} text="Reset Auth Store" />
			</View>
			<View style={themed($itemsContainer)}>
				<ListView
					ListHeaderComponent={<Text preset="subheading" text="App Data" />}
					data={appDataList}
					keyExtractor={(item) => `${item.label}-${item.value}`}
					renderItem={({ item }) => (
						<ListItem
							LeftComponent={
								<View style={themed($item)}>
									<Text preset="bold">{item.label}</Text>
									<Text>{item.value}</Text>
								</View>
							}
						/>
					)}
				/>
			</View>

			<View style={themed($itemsContainer)}>
				<ListView
					ListHeaderComponent={
						<Text preset="subheading" text="Environment Variables" />
					}
					data={envsDataList}
					keyExtractor={(item) => item.label}
					renderItem={({ item }) => (
						<ListItem
							LeftComponent={
								<View style={themed($item)}>
									<Text preset="bold">{item.label}</Text>
									<Text>{item.value}</Text>
								</View>
							}
						/>
					)}
				/>
			</View>

			<View style={themed($itemsContainer)}>
				<ListView
					ListHeaderComponent={<Text preset="subheading" text="User Data" />}
					data={userDataList}
					keyExtractor={(item) => `${item.label}-${item.value}`}
					renderItem={({ item }) => (
						<ListItem
							LeftComponent={
								<View style={themed($item)}>
									<Text preset="bold">{item.label}</Text>
									<Text>{item.value}</Text>
								</View>
							}
						/>
					)}
				/>
			</View>

			<View style={themed($itemsContainer)}>
				<ListView
					ListHeaderComponent={<Text preset="subheading" text="User Data" />}
					data={userDataList}
					keyExtractor={(item) => `${item.label}-${item.value}`}
					renderItem={({ item }) => (
						<ListItem
							LeftComponent={
								<View style={themed($item)}>
									<Text preset="bold">{item.label}</Text>
									<Text>{item.value}</Text>
								</View>
							}
						/>
					)}
				/>
			</View>

			<View style={themed($buttonContainer)}>
				<Button
					style={themed($button)}
					tx="demoDebugScreen:reactotron"
					onPress={demoReactotron}
				/>
				<Text
					style={themed($hint)}
					tx={`demoDebugScreen:${Platform.OS}ReactotronHint` as const}
				/>
			</View>
			<View style={themed($buttonContainer)}>
				<Button style={themed($button)} tx="common:logOut" onPress={logout} />
			</View>
		</Screen>
	);
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingBottom: spacing.xxl,
});

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xxl,
});

const $reportBugsLink: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
	color: colors.tint,
	marginBottom: spacing.lg,
	alignSelf: isRTL ? "flex-start" : "flex-end",
});

const $item: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginBottom: spacing.md,
});

const $itemsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginVertical: spacing.xl,
	gap: spacing.md,
});

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginBottom: spacing.xs,
});

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginBottom: spacing.md,
});

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
	color: colors.palette.neutral600,
	fontSize: 12,
	lineHeight: 15,
	paddingBottom: spacing.lg,
});
