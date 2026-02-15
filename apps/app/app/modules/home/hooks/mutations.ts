import { useMutation } from "@tanstack/react-query";
import { STREAK } from "../api";

export const useStreakCreation = () => {
	return useMutation({
		mutationFn: STREAK.SAVE,
	});
};
