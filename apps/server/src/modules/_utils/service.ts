type ResourceId = number;
interface PaginatePayload {
	limit: number;
	offset: number;
	search?: string;
}

abstract class ResourceService {
	create<T>(payload: T) {}

	async get(paginatePayload: PaginatePayload) {}
	count(paginatePayload: PaginatePayload) {}

	getById(id: ResourceId) {}
	async updateById<T>(id: ResourceId, payload: T) {}
	async deleteById(id: ResourceId) {}
}

export type { ResourceId, PaginatePayload };
export { ResourceService };
