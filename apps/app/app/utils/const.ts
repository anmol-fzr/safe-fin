import { envs } from "./envs";

export const APP = {
	NAME: envs.isProd ? "SafeFin" : `SafeFin ${envs.MODE}`,
	DESC: "Your Friend for Financial Learnings",
} as const;

type ConstantConfig = {
	label: string;
	key: string;
	value: number;
};

export type SliderConfig = ConstantConfig & {
	step: number;
	minValue: number;
	maxValue: number;
};
