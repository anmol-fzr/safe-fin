import { useCallback, useEffect, useRef, useState } from "react";

export const useCountdown = (secs = 30) => {
	const [countdown, setCountdown] = useState(secs);
	const intervalRef = useRef<number | null>(null);

	const clear = useCallback(() => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}, []);

	useEffect(() => {
		return clear;
	}, []);

	const start = useCallback(() => {
		clear();

		intervalRef.current = window.setInterval(() => {
			setCountdown((prev) => {
				if (prev > 0) {
					return prev - 1;
				} else {
					clear(); // auto-clear when countdown reaches 0
					return 0;
				}
			});
		}, 1000);
	}, []);

	const reset = useCallback(() => {
		clear();
		setCountdown(secs);
	}, [secs]);

	const restart = useCallback(() => {
		reset();
		start();
	}, [reset, start]);

	return { countdown, start, reset, restart };
};
