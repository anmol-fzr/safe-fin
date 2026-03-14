import { axiosInstance, IResData } from "@/services/axios";
import { IReqParams, ResourceId } from "@/types";

export type Scam = {
	id: number;
	title: string;
	desc: string;
	tags: string[];
};
export type Scams = Scam[];

const { get } = axiosInstance;

type IResScams = IResData<Scams, true>;
type IResScam = IResData<Scam>;

export const SCAM = {
	ALL: (params: IReqParams) => get<unknown, IResScams>("/scam", { params }),
	ONE: (scamId: ResourceId) => get<unknown, IResScam>(`/scam/${scamId}`),
} as const;
