import { axiosInstance, type IResData } from "@/services/axios";

const { post, get } = axiosInstance;

export const STREAK = {
	SAVE: () => post<unknown, IResSaveStreak>("/streak"),
};

export const HOME = {
	UI: () => get<unknown, IResHomeUI>("/sdui/home"),
};

type IResHomeUI = IResData<
	{
		componentName:
			| "ProfileCompletionBanner"
			| "QuickActions"
			| "InProgressCourseCard"
			| "ForYouLessons"
			| "UpdateAvailableCard"
			| "ShareAppCard"
			| "DynamicCard";
		props?: Record<string, unknown>;
	}[]
>;

type IResSaveStreak = IResData<StreakData>;

export interface StreakData {
	current: number;
	maximum: number;
	status: StreakStatus;
}

export type StreakStatus = "new" | "reset" | "continued" | "same";
