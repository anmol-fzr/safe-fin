import { useMemo } from "react";
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Theme } from "./index";

type Style = ViewStyle | TextStyle | ImageStyle;
type ThemeStyle = Style | ((theme: Theme) => Style);
type StyleArray = StyleProp<Style>;

type VariantDefinitions = Record<string, Record<string, ThemeStyle>>;

// Helper to prevent inference from usage
type NoInfer<T> = [T][T extends any ? 0 : never];

// Relaxed selection type that maps V's keys exactly, filtering out index signatures
type VariantSelection<V> = {
	[K in keyof V as string extends K ? never : K]?: V[K] extends Record<
		string,
		any
	>
		? keyof V[K]
		: never;
};

// 1. Helper Type to extract variant props
export type StyleVariantProps<T extends (...args: any) => any> =
	Parameters<T>[0];

// 2. The Main Function
export function sva<V>(config: {
	base?: ThemeStyle;
	variants?: V;
	compoundVariants?: (VariantSelection<NoInfer<V>> & { style: ThemeStyle })[];
	defaultVariants?: VariantSelection<NoInfer<V>>;
}) {
	const { base, variants, compoundVariants, defaultVariants } = config;

	// Returns a hook that takes props and returns a merged style
	return (
		props: VariantSelection<V> & { style?: StyleArray } = {},
	): StyleArray => {
		const { theme } = useAppTheme();

		return useMemo(() => {
			const styles: StyleArray = [];

			// Helper to resolve style (function or object)
			const resolve = (s: ThemeStyle | undefined) => {
				if (!s) return null;
				return typeof s === "function" ? s(theme) : s;
			};

			// 0. Apply base style
			const baseStyle = resolve(base);
			if (baseStyle) styles.push(baseStyle);

			// Merge defaults with provided props
			const activeProps = { ...defaultVariants, ...props } as any;

			// 1. Apply simple variants
			if (variants) {
				Object.keys(variants).forEach((key) => {
					// @ts-expect-error
					const variantKey = activeProps[key];
					// Handle boolean variants (true/false) or string variants
					if (
						variantKey !== undefined &&
						variantKey !== null &&
						// @ts-expect-error
						variants[key]?.[variantKey]
					) {
						// @ts-expect-error
						styles.push(resolve(variants[key][variantKey]));
					}
				});
			}

			// 2. Apply compound variants
			if (compoundVariants) {
				compoundVariants.forEach((cv) => {
					const { style: cvStyle, ...specs } = cv;
					// Check if all specs match the active props
					const match = Object.keys(specs).every((key) => {
						return String((specs as any)[key]) === String(activeProps[key]);
					});

					if (match) {
						styles.push(resolve(cvStyle));
					}
				});
			}

			// 3. Append any extra style passed via props
			if (props.style) {
				styles.push(props.style);
			}

			return styles.flat().filter(Boolean) as StyleArray;
		}, [props, theme]);
	};
}
