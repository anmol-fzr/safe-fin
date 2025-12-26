const currenctFmt = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0,
});

function isStrictlySameObj(
	checkFromObj: Record<string, unknown>,
	checkAtObj: Record<string, unknown>,
) {
	let isSame = true;

	for (const [key, value] of Object.entries(checkFromObj)) {
		const valInOther = checkAtObj[key];
		console.log(`Checking, ${value} against ${valInOther}`);

		if (valInOther === undefined || valInOther !== value) {
			isSame = false;
			break;
		}
	}

	return isSame;
}

type DebouncingFunc<T> = (args: T) => void;

export function debounce<A>(func: DebouncingFunc<A>, timeout = 300) {
	let timer: number;

	const fn: DebouncingFunc<A> = (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			// @ts-expect-error
			func.apply(this, args);
		}, timeout);
	};

	return fn;
}

export { currenctFmt, isStrictlySameObj };
