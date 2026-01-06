import { z } from "zod";
import { queryParamSchema } from "@/schema/params";
import { createTypedFactory } from "../factory";

type PaginationQueryParams = z.infer<typeof queryParamSchema>;

const { createMiddleware } = createTypedFactory<{
	Variables: {
		paginate: PaginationQueryParams & { offset: number };
	};
}>();

export function getPaginateRes({
	total,
	offset = 0,
	limit = 10,
}: {
	total: number;
	offset?: number;
	limit?: number;
}) {
	const hasMore = offset + limit < total;
	const nextPage = hasMore ? offset + limit + 1 : null;

	return { total, hasMore, nextPage };
}

export const paginate = createMiddleware(async (c, next) => {
	const queryParams: PaginationQueryParams = c.req.valid("query");

	const offset = (queryParams.page - 1) * queryParams.limit;

	c.set("paginate", { ...queryParams, offset });
	await next();
});
