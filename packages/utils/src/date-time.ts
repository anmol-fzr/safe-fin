type DateTimeStyle = "short" | "full" | "long" | "medium";

type DateTimeOpts = {
	dateStyle: DateTimeStyle;
	timeStyle: DateTimeStyle;
};

export function formatDateTime(date: string | Date, opts?: DateTimeOpts) {
	return new Intl.DateTimeFormat("en-IN", {
		dateStyle: opts?.dateStyle ?? "medium",
		timeStyle: opts?.timeStyle ?? "medium",
	}).format(new Date(date));
}

export function formatDate(date: string | Date) {
	if (date instanceof Date) {
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "2-digit",
			year: "numeric",
		}).format(date);
	}

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	}).format(new Date(date));
}
