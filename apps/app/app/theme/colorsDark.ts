const palette = {
	// Inverted Neutrals for Dark Mode
	neutral100: "#121212", // Darkest background
	neutral200: "#1E1E1E", // Card/Elevated surface
	neutral300: "#303030", // Border/Separator
	neutral400: "#4F4F4F",
	neutral500: "#8A8A8A", // Dimmed text/Icon default
	neutral600: "#CFCFCF", // Secondary text
	neutral700: "#E0E0E0", // Primary text
	neutral800: "#FFFFFF", // Highest contrast text
	neutral900: "#FFFFFF",

	// Primary (Kept the same hue, slightly adjusted for vibrancy on dark bg)
	primary100: "#311C14",
	primary200: "#5F382A",
	primary300: "#925A47",
	primary400: "#D28468",
	primary500: "#F0A07B", // Adjusted for contrast
	primary600: "#FFC8A8",

	// Secondary (Kept the same hue, slightly adjusted for vibrancy on dark bg)
	secondary100: "#1A1B28",
	secondary200: "#393C52",
	secondary300: "#606485",
	secondary400: "#8D92B9",
	secondary500: "#ADB2D6",

	// Accent (Kept the same hue, slightly adjusted for vibrancy on dark bg)
	accent100: "#071B33", // Dark Accent Background
	accent200: "#143C6B",
	accent300: "#2B68A6",
	accent400: "#51A2FF", // Active color
	accent500: "#8FC9FF", // Lighter Active color (High contrast)
	//accent500: "#2b7fff",

	// Angry (Kept the same)
	angry100: "#2A0E10", // Dark Angry Background
	angry500: "#FB4D55", // Adjusted for contrast

	// Success (Kept the same hue)
	success: "#4BB543", // Adjusted for contrast
	successBackground: "#1B3B2B", // Dark Success Background

	// Warning (Kept the same hue)
	warning: "#FFC107", // Adjusted for contrast
	warningBackground: "#332700", // Dark Warning Background

	// Overlay (Kept the same, but based on a dark-mode base color)
	overlay20: "rgba(255, 255, 255, 0.2)",
	overlay50: "rgba(255, 255, 255, 0.5)",
} as const;

export const colors = {
	palette,
	transparent: "rgba(0, 0, 0, 0)",
	/**
	 * Primary text color should be light.
	 */
	text: palette.neutral800,
	/**
	 * Reverse text color should be dark.
	 */
	textInverse: palette.neutral200,
	/**
	 * Secondary text information.
	 */
	textDim: palette.neutral600,
	/**
	 * The default color of the screen background (very dark).
	 */
	background: palette.neutral100, // Very dark background
	/**
	 * The default border color.
	 */
	border: palette.neutral300,
	/**
	 * The main tinting color (Active color).
	 */
	tint: palette.accent400,
	/**
	 * The inactive tinting color.
	 */
	tintInactive: palette.neutral500,
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
