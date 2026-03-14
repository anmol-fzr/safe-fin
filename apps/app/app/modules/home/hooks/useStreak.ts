import { useEffect, useRef } from "react";
import { useStreakCreation } from "./mutations";

export const useStreak = () => {
	const { mutate, data: streak } = useStreakCreation();
	const isCalled = useRef(false);

	useEffect(function recordStreakOnceMount() {
		if (isCalled.current) {
			return;
		}
		mutate();
		isCalled.current = true;
	}, []);

	return streak;
};
