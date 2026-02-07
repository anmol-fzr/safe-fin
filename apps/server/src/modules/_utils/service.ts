type ResourceId = number;
interface PaginatePayload {
	limit: number;
	offset: number;
}

abstract class ResourceService {
	create<T>(payload: T) {}

	async get(paginatePayload: PaginatePayload) {}
	count(paginatePayload: PaginatePayload) {}

	getById(id: ResourceId) {}
	updateById(id: ResourceId) {}
	deleteById(id: ResourceId) {}
}

export type { ResourceId, PaginatePayload };
export { ResourceService };
