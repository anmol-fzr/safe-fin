type IResData<D = any> = {
	data: D;
	message: string;
	total: number;
};

type IPaginatedReqParams = {
	limit: number;
	skip: number;
};

interface ITimestamps {
	createdAt: string;
	updatedAt: string;
}

interface IBaseData {
	id: ResourceId;
}

type IReqParams = Record<string, string | number>;

type ResourceId = number;

export type {
	IResData,
	IReqParams,
	IPaginatedReqParams,
	ResourceId,
	ITimestamps,
	IBaseData,
};
