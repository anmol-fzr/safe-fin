import { axiosInstance, type IResData } from "@/services/axios";
import type { IReqParams, ResourceId } from "@/types";

interface ICalculator {
	title: string;
	list: List;
	sliders: Slider[];
	resultKeys: ResultKeys;
	pieChart: boolean;
	calculate: Calculate;
}

interface List {
	title: string;
	desc: string;
	screen: string;
}

interface Slider {
	label: string;
	key: string;
	value: number;
	step: number;
	minValue: number;
	maxValue: number;
}

interface ResultKeys {
	totalInvested: string;
	returns: string;
	totalValue: string;
}

export interface Calculate {
	totalValue: string;
	totalInvested: string;
	returns: string;
}

const { get } = axiosInstance;

type ICalculators = ICalculator[];
type IResCalculator = IResData<ICalculator>;
type IResCalculators = IResData<ICalculators>;

export const CALCULATOR = {
	ALL: () => get<IResCalculators, IResCalculators>(`/calculator`),
	ONE: (id: ResourceId) =>
		get<IResCalculator, IResCalculator>(`/calculator/${id}`),
	//ALL: (params: IReqParams) => get<IResCalculators, IResCalculators>(`/calculator`, { params }),
} as const;
