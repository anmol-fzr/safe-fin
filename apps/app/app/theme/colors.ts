// const palette = {
// 	neutral100: "#FFFFFF",
// 	neutral200: "#F4F2F1",
// 	neutral300: "#D7CEC9",
// 	neutral400: "#B6ACA6",
// 	neutral500: "#978F8A",
// 	neutral600: "#564E4A",
// 	neutral700: "#3C3836",
// 	neutral800: "#191015",
// 	neutral900: "#000000",
//
// 	primary100: "#F4E0D9",
// 	primary200: "#E8C1B4",
// 	primary300: "#DDA28E",
// 	primary400: "#D28468",
// 	primary500: "#C76542",
// 	primary600: "#A54F31",
//
// 	secondary100: "#DCDDE9",
// 	secondary200: "#BCC0D6",
// 	secondary300: "#9196B9",
// 	secondary400: "#626894",
// 	secondary500: "#41476E",
//
// 	accent100: "#eff6ff",
// 	accent200: "#dbeafe",
// 	accent300: "#bedbff",
// 	accent400: "#8ec5ff",
// 	accent500: "#51a2ff",
// 	//accent500: "#2b7fff",
//
// 	//angry100: "#F2D6CD",
// 	//angry500: "#C03403",
// 	angry100: "#ffe2e2",
// 	angry500: "#fb2c36",
//
// 	success: "#2F855A",
// 	successBackground: "#70FFAE",
//
// 	warning: "#2F855A",
// 	warningBackground: "#FFDC86",
//
// 	overlay20: "rgba(25, 16, 21, 0.2)",
// 	overlay50: "rgba(25, 16, 21, 0.5)",
// } as const;
//
// export const colors = {
// 	/**
// 	 * The palette is available to use, but prefer using the name.
// 	 * This is only included for rare, one-off cases. Try to use
// 	 * semantic names as much as possible.
// 	 */
// 	palette,
// 	/**
// 	 * A helper for making something see-thru.
// 	 */
// 	transparent: "rgba(0, 0, 0, 0)",
// 	/**
// 	 * The default text color in many components.
// 	 */
// 	text: palette.neutral800,
// 	/**
// 	 * Reverse text color.
// 	 */
// 	textInverse: palette.neutral200,
// 	/**
// 	 * Secondary text information.
// 	 */
// 	textDim: palette.neutral500,
// 	/**
// 	 * Secondary text information.
// 	 */
// 	textDisabled: palette.neutral600,
// 	/**
// 	 * The default color of the screen background.
// 	 */
// 	background: palette.accent100,
// 	/**
// 	 * The default border color.
// 	 */
// 	border: palette.neutral400,
// 	/**
// 	 * The main tinting color.
// 	 */
// 	tint: palette.accent500,
// 	/**
// 	 * The inactive tinting color.
// 	 */
// 	//tintInactive: "#EFEFEF",
// 	tintInactive: palette.neutral300,
// 	/**
// 	 * A subtle color used for lines.
// 	 */
// 	separator: palette.neutral300,
// 	/**
// 	 * Error messages.
// 	 */
// 	error: palette.angry500,
// 	/**
// 	 * Error Background.
// 	 */
// 	errorBackground: palette.angry100,
// 	/**
// 	 * Success messages.
// 	 */
// 	success: palette.success,
// 	/**
// 	 * Success Background.
// 	 */
// 	successBackground: palette.successBackground,
// } as const;
const palette = {
	neutral100: "#FFFFFF", // Main Background
	neutral200: "#F7F7F7", // Secondary Background / Cards
	neutral300: "#E5E5E5", // Borders and Dividers
	neutral400: "#D4D4D4", // Disabled state borders
	neutral500: "#737373", // Muted text / Captions
	neutral600: "#525252", // Secondary text
	neutral700: "#262626", // Bold text / Subheadings
	neutral800: "#171717", // Main Heading text
	neutral900: "#000000", // Absolute black

	// Prismo Electric Purple
	primary100: "#F5F0FF",
	primary200: "#E9D9FF",
	primary300: "#C09BFF",
	primary400: "#A875FF",
	primary500: "#814DE5", // Main Brand Color
	primary600: "#6939C1",

	// Prismo Lime Green (Accents)
	secondary100: "#F9FFEA",
	secondary200: "#EFFFBC",
	secondary300: "#DFFF6F",
	secondary400: "#CCFF2E",
	secondary500: "#BAFF00", // Highlight / Badge color

	// Using the Purple for Accents to maintain SaaS feel
	accent100: "#F8F7FF",
	accent200: "#EDEBFF",
	accent300: "#D9D6FF",
	accent400: "#814DE5",
	accent500: "#814DE5",

	angry100: "#FEE2E2",
	angry500: "#EF4444",

	success: "#166534",
	successBackground: "#DCFCE7",

	warning: "#92400E",
	warningBackground: "#FEF3C7",

	overlay20: "rgba(0, 0, 0, 0.2)",
	overlay50: "rgba(0, 0, 0, 0.5)",
} as const;

export const colors = {
	palette,
	transparent: "rgba(0, 0, 0, 0)",
	text: palette.neutral800,
	textInverse: palette.neutral100,
	textDim: palette.neutral500,
	textDisabled: palette.neutral400,
	background: palette.neutral100, // Light Mode White
	border: palette.neutral300,
	tint: palette.primary500, // Purple Tint
	tintInactive: palette.neutral300,
	separator: palette.neutral200,
	error: palette.angry500,
	errorBackground: palette.angry100,
	success: palette.success,
	successBackground: palette.successBackground,
} as const;
