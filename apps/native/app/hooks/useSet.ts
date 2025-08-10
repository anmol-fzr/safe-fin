import { useState, useCallback } from "react";

export function useSet<T>(initial: T[] = []) {
	const [set, setSet] = useState(new Set<T>(initial));

	const add = useCallback(
		(value: T) => setSet((prev) => new Set([...prev, value])),
		[],
	);

	const remove = useCallback(
		(value: T) =>
			setSet((prev) => {
				const next = new Set(prev);
				next.delete(value);
				return next;
			}),
		[],
	);

	const toggle = useCallback(
		(value: T) =>
			setSet((prev) => {
				const next = new Set(prev);
				if (next.has(value)) next.delete(value);
				else next.add(value);
				return next;
			}),
		[],
	);

	return { set, add, remove, toggle, has: set.has };
}
