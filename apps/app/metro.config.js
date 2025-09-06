// /* eslint-env node */
// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require("expo/metro-config");
//
// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);
//
// config.transformer.getTransformOptions = async () => ({
// 	transform: {
// 		// Inline requires are very useful for deferring loading of large dependencies/components.
// 		// For example, we use it in app.tsx to conditionally load Reactotron.
// 		// However, this comes with some gotchas.
// 		// Read more here: https://reactnative.dev/docs/optimizing-javascript-loading
// 		// And here: https://github.com/expo/expo/issues/27279#issuecomment-1971610698
// 		inlineRequires: true,
// 	},
// });
//
// // This helps support certain popular third-party libraries
// // such as Firebase that use the extension cjs.
// config.resolver.sourceExts.push("cjs");
// config.resolver.unstable_enablePackageExports = true;
//
// module.exports = config;

// apps/native/metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

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

module.exports = config;
