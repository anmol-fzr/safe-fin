const path = require("path");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(projectRoot);

// 1. Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
	path.resolve(projectRoot, "node_modules"),
	path.resolve(workspaceRoot, "node_modules"),
];

// 3. Enable support for symlinks and package exports
config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true;

// 4. Add 'cjs' extension for third-party packages.
config.resolver.sourceExts.push("cjs");

// config.transformer = {
// 	...config.transformer,
// 	unstable_transformProfile: "hermes-stable", // required
// };

module.exports = config;
