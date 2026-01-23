import type { ExternalPathString } from "expo-router";

const env = process.env;
const isDev = env.EXPO_PUBLIC_MODE === "DEV" || __DEV__;

export const envs = Object.freeze({
	isDev,
	API_URL: "https://safe-fin.anmol-fzr.workers.dev/api/v1",
	get AUTH_API_URL() {
		return `${this.API_URL}/auth`;
	},
	SENTRY: Object.freeze({
		DSN:
			env.EXPO_PUBLIC_SENTRY_DSN ??
			"https://ba79f0ccb7a703cd14e3bd6416535916@o4506835291078656.ingest.us.sentry.io/4506835294748672",
	}),
	META_URLS: Object.freeze({
		PLAYSTORE: (env.EXPO_PUBLIC_METADATA_PLAYSTORE ??
			"https://github.com/anmol-fzr/safe-fin") as ExternalPathString,
		APPSTORE: (env.EXPO_PUBLIC_METADATA_APPSTORE ??
			"https://github.com/anmol-fzr/safe-fin") as ExternalPathString,
		GITHUB: (env.EXPO_PUBLIC_METADATA_GITHUB ??
			"https://github.com/anmol-fzr/safe-fin") as ExternalPathString,

		ABOUT: (env.EXPO_PUBLIC_METADATA_ABOUT_URL ??
			"https://safefin.framer.website/#about") as ExternalPathString,
		TERMS: (env.EXPO_PUBLIC_METADATA_TERMS_URL ??
			"https://safefin.framer.website/terms-conditions") as ExternalPathString,
		SUPPORT: (env.EXPO_PUBLIC_METADATA_SUPPORT_URL ??
			"https://safefin.framer.website/") as ExternalPathString,
		POLICY: (env.EXPO_PUBLIC_METADATA_POLICY_URL ??
			"https://safefin.framer.website/privacy-policy") as ExternalPathString,
	}),
});
