import { axiosInstance, IResData } from "@/services/axios";

const { post } = axiosInstance;

export const STREAK = {
	SAVE: () => post<unknown, IResSaveStreak>("/streak"),
};

type IResSaveStreak = IResData<StreakData>;

export interface StreakData {
	current: number;
	maximum: number;
	status: StreakStatus;
}

export type StreakStatus = "new" | "reset" | "continued" | "same";
