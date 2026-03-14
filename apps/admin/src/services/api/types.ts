interface PaginateMore {
	total: number;
	hasMore: true;
	nextPage: number;
}

interface PaginateLast {
	total: number;
	hasMore: false;
	nextPage: null;
}

type Paginate = PaginateMore | PaginateLast;

type IResData<D = never, P = false> = {
	data: D;
	message: string;
	error: string;
	paginate: P extends true ? Paginate : undefined;
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
