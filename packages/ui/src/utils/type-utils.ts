function isUndefined(val: unknown): val is undefined {
	return val === undefined;
}

function isNull(val: unknown): val is null {
	return val === null;
}

export { isUndefined, isNull };
