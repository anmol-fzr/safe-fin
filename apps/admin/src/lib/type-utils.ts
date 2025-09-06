function isUndefined(val: any): val is undefined {
	return val === undefined;
}

function isNull(val: any): val is null {
	return val === null;
}

export { isUndefined, isNull };
