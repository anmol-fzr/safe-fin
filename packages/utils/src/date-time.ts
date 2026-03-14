export function formatDateTime(
	date: string | Date,
	opts?: Intl.DateTimeFormatOptions,
) {
	const { dateStyle = "medium", timeStyle = "medium", ...rest } = opts ?? {};

	return new Intl.DateTimeFormat("en-IN", {
		dateStyle,
		timeStyle,
		...rest,
	}).format(ensureDateType(date));
}

export function formatDate(date: string | Date) {
	return new Intl.DateTimeFormat("en-IN", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	}).format(ensureDateType(date));
}

function ensureDateType(date: string | Date) {
	return date instanceof Date ? date : new Date(date);
}

export function getDay(date: string | Date) {
	return new Intl.DateTimeFormat("en-IN", { weekday: "long" }).format(
		ensureDateType(date),
	);
}

export function getMonth(date: string | Date) {
	return new Intl.DateTimeFormat("en-IN", { month: "long" }).format(
		ensureDateType(date),
	);
}
