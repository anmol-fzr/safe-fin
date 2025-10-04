import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSettingsStore } from "@/store/useSettingsStore";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDateTime(date: string) {
	const { dateStyle, timeStyle } = useSettingsStore.getState().dateTime;

	return new Intl.DateTimeFormat("en-US", {
		dateStyle,
		timeStyle,
	}).format(new Date(date));
}

const enOrdinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes = new Map([
	["one", "st"],
	["two", "nd"],
	["few", "rd"],
	["other", "th"],
]);

export const formatOrdinals = (n: number) => {
	const rule = enOrdinalRules.select(n);
	const suffix = suffixes.get(rule);
	return `${n}${suffix}`;
};

export const secsToClockTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	const paddedMinutes = String(minutes).padStart(2, "0");
	const paddedSeconds = String(remainingSeconds).padStart(2, "0");

	return `${paddedMinutes}:${paddedSeconds}`;
};

export const { isNaN } = Number;
