const palette = {
	neutral100: "#FFFFFF",
	neutral200: "#F4F2F1",
	neutral300: "#D7CEC9",
	neutral400: "#B6ACA6",
	neutral500: "#978F8A",
	neutral600: "#564E4A",
	neutral700: "#3C3836",
	neutral800: "#191015",
	neutral900: "#000000",

	primary100: "#F4E0D9",
	primary200: "#E8C1B4",
	primary300: "#DDA28E",
	primary400: "#D28468",
	primary500: "#C76542",
	primary600: "#A54F31",

	secondary100: "#DCDDE9",
	secondary200: "#BCC0D6",
	secondary300: "#9196B9",
	secondary400: "#626894",
	secondary500: "#41476E",

	accent100: "#eff6ff",
	accent200: "#dbeafe",
	accent300: "#bedbff",
	accent400: "#8ec5ff",
	accent500: "#51a2ff",
	//accent500: "#2b7fff",

	//angry100: "#F2D6CD",
	//angry500: "#C03403",
	angry100: "#ffe2e2",
	angry500: "#fb2c36",

	success: "#2F855A",
	successBackground: "#70FFAE",

	warning: "#2F855A",
	warningBackground: "#FFDC86",

	overlay20: "rgba(25, 16, 21, 0.2)",
	overlay50: "rgba(25, 16, 21, 0.5)",
} as const;

export const colors = {
	/**
	 * The palette is available to use, but prefer using the name.
	 * This is only included for rare, one-off cases. Try to use
	 * semantic names as much as possible.
	 */
	palette,
	/**
	 * A helper for making something see-thru.
	 */
	transparent: "rgba(0, 0, 0, 0)",
	/**
	 * The default text color in many components.
	 */
	text: palette.neutral800,
	/**
	 * Secondary text information.
	 */
	textDim: palette.neutral500,
	/**
	 * Secondary text information.
	 */
	textDisabled: palette.neutral600,
	/**
	 * The default color of the screen background.
	 */
	background: palette.accent100,
	/**
	 * The default border color.
	 */
	border: palette.neutral400,
	/**
	 * The main tinting color.
	 */
	tint: palette.accent500,
	/**
	 * The inactive tinting color.
	 */
	//tintInactive: "#EFEFEF",
	tintInactive: palette.neutral300,
	/**
	 * A subtle color used for lines.
	 */
	separator: palette.neutral300,
	/**
	 * Error messages.
	 */
	error: palette.angry500,
	/**
	 * Error Background.
	 */
	errorBackground: palette.angry100,
	/**
	 * Success messages.
	 */
	success: palette.success,
	/**
	 * Success Background.
	 */
	successBackground: palette.successBackground,
} as const;
