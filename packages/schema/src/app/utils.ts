import { z } from "zod";

const paginateSchema = z.object({
	total: z.number().int().positive(),
	hasMore: z.boolean(),
	nextPage: z.union([z.number(), z.null()]),
});

export { paginateSchema };
