import { zValidator } from "@hono/zod-validator";
import { queryParamSchema } from "@/schema/params";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory();

export function getPaginateRes({ total, offset, limit }: { total: number }) {
	const hasMore = offset + limit < total;
	const nextPage = hasMore ? offset + limit + 1 : null;

	return { total, hasMore, nextPage };
}

export const paginate = createMiddleware(async (c, next) => {
	const queryParams = c.req.valid("query");

	const offset = (queryParams.page - 1) * queryParams.limit;

	c.set("paginate", { ...queryParams, offset });
	await next();
});
