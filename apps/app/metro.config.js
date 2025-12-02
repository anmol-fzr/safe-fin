const path = require("path");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(projectRoot);

config.watchFolders = [...config.watchFolders, workspaceRoot];

config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, "node_modules"),
	path.resolve(workspaceRoot, "node_modules"),
];

// config.resolver.unstable_enableSymlinks = true;
// config.resolver.unstable_enablePackageExports = true;

config.resolver.sourceExts.push("cjs");

config.transformer = {
	...config.transformer,
	unstable_transformProfile: "hermes-stable", // required
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
