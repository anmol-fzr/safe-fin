import type { User } from "@safe-fin/auth";
import { ResultAsync } from "neverthrow";
import { Reason } from "./reasons";

type ResourceId = number;

interface PaginatePayload {
	limit: number;
	offset: number;
	search?: string;
}

type ServiceError = {
	reason: (typeof Reason)[keyof typeof Reason];
	error: unknown;
};

abstract class ResourceService<Entity, CreatePayload, UpdatePayload> {
	abstract create(
		payload: CreatePayload,
	): ResultAsync<{ data: Entity }, ServiceError>;

	abstract get(
		paginatePayload: PaginatePayload,
	): ResultAsync<{ data: Entity[]; paginate: unknown }, ServiceError>;

	abstract getById(
		id: ResourceId,
		user: User,
		context?: unknown,
	): ResultAsync<{ data: Entity }, ServiceError>;

	abstract updateById(
		id: ResourceId,
		payload: UpdatePayload,
	): ResultAsync<{ data: Entity }, ServiceError>;

	abstract deleteById(
		id: ResourceId,
		user: User,
	): ResultAsync<{ data: Entity }, ServiceError>;
}

export type { ResourceId, PaginatePayload, ServiceError };
export { ResourceService };
