import { useEffect, useState } from "react";

export function useDebounce(query: string, delay: number) {
	const [debounced, setDebounced] = useState("");

	useEffect(() => {
		const id = setTimeout(() => {
			setDebounced(query);
		}, delay);

		return () => {
			clearTimeout(id);
		};
	}, [query, delay]);

	return debounced;
}
