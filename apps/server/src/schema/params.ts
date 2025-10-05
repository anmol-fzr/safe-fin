import * as z from "zod";

export const queryParamSchema = z.object({
	// searchValue: z
	// 	.string()
	// 	.optional()
	// 	.describe('The value to search for. Eg: "some name"'),
	// searchField: z
	// 	.enum(["email", "name"])
	// 	.describe(
	// 		'The field to search in, defaults to email. Can be `email` or `name`. Eg: "name"',
	// 	)
	// 	.optional(),
	// searchOperator: z
	// 	.enum(["contains", "starts_with", "ends_with"])
	// 	.describe(
	// 		'The operator to use for the search. Can be `contains`, `starts_with` or `ends_with`. Eg: "contains"',
	// 	)
	// 	.optional(),
	limit: z.coerce
		.number()
		.describe("The number of users to return")
		.optional()
		.default(10),
	offset: z
		.string()
		.describe("The offset to start from")
		.or(z.number())
		.optional()
		.default(0),
	sortBy: z.string().default("createdAt"),
	sortDirection: z
		.enum(["asc", "desc"])
		.describe("The direction to sort by")
		.default("desc"),
	// filterField: z.string().describe("The field to filter by").optional(),
	// filterValue: z
	// 	.string()
	// 	.describe("The value to filter by")
	// 	.or(z.number())
	// 	.or(z.boolean())
	// 	.optional(),
	// filterOperator: z
	// 	.enum(["eq", "ne", "lt", "lte", "gt", "gte", "contains"])
	// 	.describe("The operator to use for the filter")
	// 	.optional(),
});
