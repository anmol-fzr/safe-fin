import {
	type DefaultTheme,
	useTheme as useNavTheme,
} from "@react-navigation/native";
import { createContext, use, useCallback, useMemo } from "react";
import { type StyleProp, useColorScheme } from "react-native";
import { useMMKVString } from "react-native-mmkv";
import type {
	Theme,
	ThemeContexts,
	ThemedStyle,
	ThemedStyleArray,
} from "@/theme";
import { darkTheme, lightTheme } from "@/theme";
import { MissingContextError } from "./error";
import { storage } from "./storage";

type ThemeContextType = {
	theme: ThemeContexts;
	setTheme: (newTheme: ThemeContexts) => void;
};

const ThemeContext = createContext<ThemeContextType>({
	theme: "system",
	setTheme: (_newTheme: ThemeContexts) => {
		console.error(
			"Tried to call setThemeContextOverride before the ThemeProvider was initialized",
		);
	},
});

const ThemeProvider = ThemeContext.Provider;

const themeContextToTheme = (themeContext: ThemeContexts): Theme =>
	themeContext === "dark" ? darkTheme : lightTheme;

interface UseAppThemeValue {
	navTheme: typeof DefaultTheme;
	setThemeContextOverride: (newTheme: ThemeContexts) => void;
	theme: Theme;
	themeContext: ThemeContexts;
	themed: <T>(
		styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>,
	) => T;
}

const useAppTheme = () => {
	const navTheme = useNavTheme();
	const systemColorScheme = useColorScheme();
	const context = use(ThemeContext);

	if (!context) {
		throw new MissingContextError("useTheme", " ThemeProvider");
	}

	const { theme: themeScheme, setTheme: setThemeContextOverride } = context;

	const actualTheme = useMemo(
		() => (themeScheme === "system" ? systemColorScheme : themeScheme),
		[themeScheme, systemColorScheme],
	);

	const themeVariant: Theme = useMemo(
		() => themeContextToTheme(actualTheme as ThemeContexts),
		[actualTheme],
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

			return Object.assign({}, ...stylesArray) as T;
		},
		[themeVariant],
	);

	const isDark = useMemo(() => actualTheme === "dark", [actualTheme]);

	return {
		isDark,
		navTheme,
		setThemeContextOverride,
		actualTheme,
		theme: themeVariant,
		themeContext: themeScheme,
		themed,
	} as const;
};

const useThemePersister = () => {
	const THEME_KEY = "safe-fin.theme";

	const getTheme = () =>
		(storage.getString(THEME_KEY) as ThemeContexts) || "system";
	const setTheme = (newTheme: ThemeContexts) =>
		storage.set(THEME_KEY, newTheme);

	return {
		getTheme,
		setTheme,
		THEME_KEY,
	};
};

const usePersistTheme = () => {
	const { THEME_KEY } = useThemePersister();
	const [theme, setTheme] = useMMKVString(THEME_KEY, storage);

	return [theme ?? "system", setTheme];
};

export { ThemeProvider, useAppTheme, useThemePersister, usePersistTheme };
