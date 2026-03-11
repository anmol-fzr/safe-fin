import type { ConfigContext, ExpoConfig } from "@expo/config";
import pkg from "./package.json";

require("ts-node/register");

const { APP_VARIANT } = process.env;
if (!APP_VARIANT) {
	console.error(new Error("APP_VARIANT is undefined"));
	process.exit(1);
}

const IS_PROD = APP_VARIANT === "production";

const packageName = IS_PROD ? "com.safefin" : `com.safefin.${APP_VARIANT}`;

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,

	name: IS_PROD ? "Safe Fin" : `Safe Fin ${APP_VARIANT}`,
	slug: "safeFin",
	scheme: "safefin",
	version: pkg.version,
	orientation: "portrait",
	userInterfaceStyle: "automatic",

	icon: "./assets/icons/app-icon.png",

	runtimeVersion: "1.2.0",

	newArchEnabled: true,
	jsEngine: "hermes",

	assetBundlePatterns: ["**/*"],

	updates: {
		enabled: true,
		url: "https://u.expo.dev/65ecfa2b-b101-4892-b765-64c97a4898d4",
		checkAutomatically: "ON_LOAD",
		fallbackToCacheTimeout: 0,
	},

	android: {
		package: packageName,
		allowBackup: true,
		versionCode: 2,
		//permissions: [
		//"android.permission.RECORD_AUDIO",
		//"android.permission.REQUEST_INSTALL_PACKAGES",
		//],
		adaptiveIcon: {
			foregroundImage:
				"./assets/icons/app-icons/android/adaptive-icon-transparent.png",
			monochromeImage:
				"./assets/icons/app-icons/android/adaptive-icon-transparent.png",
			backgroundColor: "#000000",
		},
	},

	ios: {
		icon: "./assets/images/app-icon-ios.png",
		supportsTablet: true,
		bundleIdentifier: packageName,
		privacyManifests: {
			NSPrivacyAccessedAPITypes: [
				{
					NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
					NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
				},
			],
		},
	},

	web: {
		favicon: "./assets/images/app-icon-web-favicon.png",
		bundler: "metro",
	},

	plugins: [
		"expo-localization",
		"expo-font",
		[
			"expo-splash-screen",
			{
				dark: {
					image:
						"./assets/icons/app-icons/android/adaptive-icon-transparent.png",
					backgroundColor: "#000000",
				},
				image:
					"./assets/icons/app-icons/android/adaptive-icon-transparent-dark.png",
				backgroundColor: "#ffffff",
				imageWidth: 300,
				resizeMode: "contain",
			},
		],
		[
			"expo-secure-store",
			{
				configureAndroidBackup: true,
				faceIDPermission:
					"Allow SafeFin to access your Face ID biometric data.",
			},
		],
		[
			"@sentry/react-native/expo",
			{
				url: "https://sentry.io/",
				project: "srvc",
				organization: "anmol-ng",
			},
		],
		[
			"expo-router",
			{
				root: "./app/routes",
			},
		],
		[
			"expo-image-picker",
			{
				photosPermission:
					"The app accesses your photos to let you set your Public Profile Image",
			},
		],

		require("./plugins/withSplashScreen").withSplashScreen,
		"expo-web-browser",
		"expo-build-properties",
	],

	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
	},

	extra: {
		eas: {
			projectId: "65ecfa2b-b101-4892-b765-64c97a4898d4",
		},
	},
});
