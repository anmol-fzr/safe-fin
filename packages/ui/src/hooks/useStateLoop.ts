import { useState } from "react";
import { useInterval } from "./useInterval";

export const useStateLoop = <T>(array: T[], delay: number) => {
	const [indx, setIndx] = useState(0);

	useInterval(() => {
		setIndx((state) => (state + 1) % array.length);
	}, delay);

	return array[indx];
};
