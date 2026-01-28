export const APP = {
	NAME: "SafeFin",
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
