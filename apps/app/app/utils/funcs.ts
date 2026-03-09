import * as Device from "expo-device";

export const isLowEndDevice = async () => {
	const year = await Device.getDeviceYearClassAsync();
	const ram = Device.totalMemory ?? 0;

	if (year && year <= 2018) return true;
	if (ram && ram < 4 * 1024 * 1024 * 1024) return true;

	return false;
};

const currenctFmt = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0,
});

type DebouncingFunc<T> = (args: T) => void;

export function debounce<A>(func: DebouncingFunc<A>, timeout = 300) {
	let timer: NodeJS.Timeout;

	const fn: DebouncingFunc<A> = (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			// @ts-expect-error
			func.apply(this, args);
		}, timeout);
	};

	return fn;
}

export { currenctFmt };
