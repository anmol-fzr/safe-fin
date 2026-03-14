export function clamp(min: number, preferred: number, max: number) {
	if (preferred < min) return min;
	if (preferred > max) return max;
	return preferred;
}

export function isValidIndex(indx: number) {
	return indx !== -1;
}

export function isInvalidIndex(indx: number) {
	return !isValidIndex(indx);
}

export * from "./date-time";
export * from "./type-utils";
