import { useIdleFetch } from "@/hooks/useIdleFetch";
import { STREAK } from "../api";
import { useState } from "react";

export const useStreak = () => {
	const [streakData, setStreakData] = useState<null | {
		current: number;
		maximum: number;
		status: "new" | "reset" | "continued" | "same";
	}>(null);

	useIdleFetch(
		() => STREAK.SAVE().then((r) => r.data),
		(data) => setStreakData(data),
	);

	return streakData;
};
