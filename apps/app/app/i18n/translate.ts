import i18n from "i18next";
import type { TOptions } from "i18next";
import type { TxKeyPath } from "./i18n";
import { Translations } from "./en";

/**
 * Translates text.
 * @param {TxKeyPath} key - The i18n key.
 * @param {TOptions} options - The i18n options.
 * @returns {string} - The translated text.
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * Usage:
 * ```ts
 * import { translate } from "./i18n"
 *
 * translate("hello", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: TOptions): string {
	if (i18n.isInitialized) {
		return i18n.t(key, options);
	}
	return key;
}

type Namespaces = keyof Translations;

// Get keys inside a namespace
type KeysOf<N extends Namespaces> = keyof Translations[N] & string;

export function t<N extends Namespaces>(namespace: N) {
	return function <K extends KeysOf<N>>(key: K, options?: TOptions): string {
		return i18n.isInitialized
			? i18n.t(`${namespace}:${key}`, options)
			: `${namespace}:${key}`;
	};
}
