const palette = {
	// Inverted Neutrals for Dark Mode
	neutral100: "#0A0A0A", // Main Background (Deepest Black)
	neutral200: "#171717", // Secondary Background / Cards
	neutral300: "#262626", // Borders and Dividers
	neutral400: "#404040", // Disabled state borders
	neutral500: "#737373", // Muted text / Captions
	neutral600: "#A3A3A3", // Secondary text
	neutral700: "#D4D4D4", // Primary text
	neutral800: "#F5F5F5", // Heading text
	neutral900: "#FFFFFF", // High contrast text

	// Primary: Electric Purple (#8A43E1)
	// 100-300 are deep background tints, 500 is your main color
	primary100: "#1D1029", // Very dark purple background
	primary200: "#2D1942",
	primary300: "#4B2570",
	primary400: "#6939C1",
	primary500: "#8A43E1", // Main Brand Color
	primary600: "#A875FF", // Lighter for Hover states in Dark Mode

	// Secondary: Vivid Orange (#EF7B16)
	secondary100: "#291605", // Very dark orange background
	secondary200: "#422308",
	secondary300: "#703B0D",
	secondary400: "#B85D0F",
	secondary500: "#EF7B16", // Highlight Color

	// Accent: Purple (Matches Primary to maintain consistency)
	accent100: "#1D1029",
	accent200: "#2D1942",
	accent300: "#4B2570",
	accent400: "#8A43E1",
	accent500: "#A875FF", // High contrast active state

	// Angry: Red (#FF2F2F)
	angry100: "#2B0909", // Dark Red Background
	angry500: "#FF2F2F", // Error State

	// Success: Green
	success: "#34D399", // Slightly lighter green for visibility on dark
	successBackground: "#064E3B", // Deep Green Background

	// Warning: Amber
	warning: "#FBBF24", // Lighter amber for visibility on dark
	warningBackground: "#451A03", // Deep Amber Background

	// Overlays (White based for dark mode to create "light" on top)
	overlay20: "rgba(255, 255, 255, 0.1)",
	overlay50: "rgba(255, 255, 255, 0.25)",
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
	 * Disabled text
	 */
	textDisabled: palette.neutral400,
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
