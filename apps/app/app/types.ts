export interface IReqParams {
	limit: number;
	page: number;
	sortDirection?: "asc" | "desc";
	sortBy?: "createdAt";
}

export type ResourceId = number;
