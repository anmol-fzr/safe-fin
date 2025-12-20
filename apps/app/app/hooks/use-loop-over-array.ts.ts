import { useInterval } from "@safe-fin/ui/hooks";
import { useState } from "react";

export const useLoopOverArray = <T>(contents: T[] | Readonly<T[]>) => {
	const [indx, setIndx] = useState(0);

	useInterval(() => {
		setIndx((state) => (state + 1) % contents.length);
	}, 2000);

	return [contents[indx], indx] as const;
};
