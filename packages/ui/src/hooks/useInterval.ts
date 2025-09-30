import { useEffect, useRef } from "react";

export const useInterval = (fn: VoidFunction, delay: number) => {
	const fnRef = useRef(fn);

	useEffect(() => {
		fnRef.current = fn;
	}, [fn]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			fnRef.current();
		}, delay);

		return () => {
			clearInterval(intervalId);
		};
	}, [delay]);
};
