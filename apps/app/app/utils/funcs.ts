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

export function debounce(func: Function, timeout = 300) {
	let timer: number;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

export { currenctFmt, isStrictlySameObj };
