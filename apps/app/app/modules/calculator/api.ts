import { axiosInstance, type IResData } from "@/services/axios";
import type { ResourceId } from "@/types";
import { safeApiParse } from "../lesson/api";

interface ICalculator {
	id: number;
	title: string;
	desc: string;
	calculator: {
		sliders: Slider[];
		resultKeys: ResultKeysObj;
		pieChart: boolean;
		pieData?: PieDaum[];
		calculate: CalculateObj;
	};
}

export interface PieDaum {
	valueKey: string;
	text: string;
}

interface Slider {
	label: string;
	key: string;
	disabled?: boolean;
	value: number;
	step: number;
	minValue: number;
	maxValue: number;
}

interface ResultKeysObj {
	[key: string]: string;
}

interface CalculateObj {
	[key: string]: string;
}

const { get } = axiosInstance;

type IResCalculator = IResData<ICalculator>;
type IResCalculators = IResData<
	{
		id: number;
		title: string;
		desc: string;
	}[],
	true
>;

export const CALCULATOR = {
	ALL: () => get<unknown, IResCalculators>(`/calculator`),
	ONE: (id: ResourceId) => get<unknown, IResCalculator>(`/calculator/${id}`),
	//ALL: (params: IReqParams) => get<IResCalculators, IResCalculators>(`/calculator`, { params }),
} as const;
