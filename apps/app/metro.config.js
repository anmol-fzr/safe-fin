const path = require("path");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
// 1. Get the base config (Sentry + Expo)
const config = getSentryExpoConfig(projectRoot, {
	annotateReactComponents: true,
});

// 2. Setup Monorepo Watch Folders
config.watchFolders = [...config.watchFolders, workspaceRoot];

// 3. Setup Node Modules Resolution
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, "node_modules"),
	path.resolve(workspaceRoot, "node_modules"),
];

config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

// 4. Handle Lottie Files (.lottie)
// We add 'lottie' to the existing assetExts list directly.
// This ensures we don't accidentally overwrite the list or get overwritten.
config.resolver.assetExts.push("lottie");

// 5. Handle Source Extensions (cjs, etc.)
config.resolver.sourceExts.push("cjs");

config.transformer = {
	...config.transformer,
	unstable_transformProfile: "hermes-stable",
};

module.exports = config;
