import {
	type DefaultTheme,
	useTheme as useNavTheme,
} from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { type StyleProp, useColorScheme } from "react-native";
import {
	darkTheme,
	lightTheme,
	type Theme,
	type ThemeContexts,
	type ThemedStyle,
	type ThemedStyleArray,
} from "@/theme";

const themeContextToTheme = (themeContext: ThemeContexts): Theme =>
	themeContext === "dark" ? darkTheme : lightTheme;

interface UseAppThemeValue {
	// The theme object from react-navigation
	navTheme: typeof DefaultTheme;
	// A function to set the theme context override (for switching modes)
	// The current theme object
	theme: Theme;
	// The current theme context "light" | "dark"
	themeContext: ThemeContexts;
	// A function to apply the theme to a style object.
	// See examples in the components directory or read the docs here:
	// https://docs.infinite.red/ignite-cli/boilerplate/app/utils/
	themed: <T>(
		styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>,
	) => T;
}

/**
 * Custom hook that provides the app theme and utility functions for theming.
 *
 * @returns {UseAppThemeReturn} An object containing various theming values and utilities.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useAppTheme = (): UseAppThemeValue => {
	const navTheme = useNavTheme();
	const colorScheme = useColorScheme();

	const themeContext: ThemeContexts = useMemo(() => {
		return "light";
		return colorScheme || (navTheme.dark ? "dark" : "light");
	}, [navTheme, colorScheme]);

	const themeVariant: Theme = useMemo(
		() => themeContextToTheme(themeContext),
		[themeContext],
	);

	const themed = useCallback(
		<T>(
			styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>,
		) => {
			const flatStyles = [styleOrStyleFn].flat(3);
			const stylesArray = flatStyles.map((f) => {
				if (typeof f === "function") {
					return (f as ThemedStyle<T>)(themeVariant);
				} else {
					return f;
				}
			});

			// Flatten the array of styles into a single object
			return Object.assign({}, ...stylesArray) as T;
		},
		[themeVariant],
	);

	return {
		navTheme,
		theme: themeVariant,
		themeContext,
		themed,
	};
};
