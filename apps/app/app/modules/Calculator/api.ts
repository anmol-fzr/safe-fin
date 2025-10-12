import { axiosInstance, type IResData } from "@/services/axios";
import type { ResourceId } from "@/types";

interface ICalculator {
	id: number;
	title: string;
	list: List;
	sliders: Slider[];
	resultKeys: ResultKeysObj;
	pieChart: boolean;
	pieData?: PieDaum[];
	calculate: CalculateObj;
}

export interface PieDaum {
	valueKey: string;
	text: string;
}

interface List {
	title: string;
	desc: string;
	screen: string;
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

type ICalculators = ICalculator[];
type IResCalculator = IResData<ICalculator>;
type IResCalculators = IResData<ICalculators, true>;

export const CALCULATOR = {
	ALL: () => get<IResCalculators, IResCalculators>(`/calculator`),
	ONE: (id: ResourceId) =>
		get<IResCalculator, IResCalculator>(`/calculator/${id}`),
	//ALL: (params: IReqParams) => get<IResCalculators, IResCalculators>(`/calculator`, { params }),
} as const;
