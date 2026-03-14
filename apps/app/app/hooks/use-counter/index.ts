import { useCallback, useMemo, useState } from "react";

type UseCounterProps = {
	init?: number;
	min?: number;
	max: number;
};

export const useCounter = ({ init = 0, min, max }: UseCounterProps) => {
	if (min === undefined) {
		min = init;
	}

	const [counter, setCounter] = useState(init);

	const onNext = useCallback(() => {
		setCounter((currCount) => {
			if (currCount < max) {
				return currCount + 1;
			}
			return currCount;
		});
	}, [max]);

	const onPrev = useCallback(() => {
		setCounter((currCount) => {
			if (currCount > min) {
				return currCount - 1;
			}
			return currCount;
		});
	}, [min]);

	const resetCounter = useCallback(() => {
		setCounter(init);
	}, [init]);

	const isFirst = useMemo(() => counter === init, [counter, init]);
	const isLast = counter === max;

	return {
		counter,
		onNext,
		onPrev,
		resetCounter,
		isFirst,
		isLast,
	};
};
