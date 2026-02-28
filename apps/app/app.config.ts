import type { ConfigContext, ExpoConfig } from "@expo/config";

/**
 * Use ts-node here so we can use TypeScript for our Config Plugins
 * and not have to compile them to JavaScript
 */
require("ts-node/register");

module.exports = ({ config }: ConfigContext): Partial<ExpoConfig> => {
	const existingPlugins = config.plugins ?? [];

	return {
		...config,

		/**
		 * Expo OTA Updates configuration
		 * Required for EAS Update to work with your production APK
		 */
		updates: {
			...(config.updates ?? {}),
			enabled: true,
			checkAutomatically: "ON_LOAD",
			fallbackToCacheTimeout: 0,
		},

		ios: {
			...config.ios,
			privacyManifests: {
				NSPrivacyAccessedAPITypes: [
					{
						NSPrivacyAccessedAPIType:
							"NSPrivacyAccessedAPICategoryUserDefaults",
						NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
					},
				],
			},
		},

		plugins: [
			...existingPlugins,
			require("./plugins/withSplashScreen").withSplashScreen,
			"expo-web-browser",
			"expo-build-properties",
			"@sentry/react-native",
		],
	};
};
