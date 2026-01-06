export function isUndefined(val: unknown): val is undefined {
	return val === undefined;
}

export function isNull(val: unknown): val is null {
	return val === null;
}
