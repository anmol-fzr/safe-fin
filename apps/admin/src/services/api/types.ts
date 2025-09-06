type IResData<D = any> = {
	data: D;
	message: string;
	total: number;
};

type IPaginatedReqParams = {
	limit: number;
	skip: number;
};

type IReqParams = Record<string, string | number>;

type ResourceId = string | number;

export type { IResData, IReqParams, IPaginatedReqParams, ResourceId };
