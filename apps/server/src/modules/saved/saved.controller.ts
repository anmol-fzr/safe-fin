import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createTypedFactory } from "@/factory";
import { authenticate, db, getPaginateRes, paginate } from "@/middleware";
import { queryParamSchema } from "@/schema/params";
import { entityTypeSchema } from "./saved.schema";
import { SavedService } from "./saved.service";

const { createHandlers } = createTypedFactory();

export const getSavedEntityHandler = createHandlers(
	authenticate,
	db,
	zValidator("query", queryParamSchema),
	paginate,
	zValidator("query", z.object({ type: entityTypeSchema })),
	async (c) => {
		const { id: userId } = c.get("user");
		const db = c.get("db");
		const { type } = c.req.valid("query");
		const { limit, offset } = c.get("paginate");

		const { data, total } = await SavedService.getSavedEntity(db, {
			userId,
			entityType: type,
			limit,
			offset,
		});

		return c.json({
			data,
			paginate: getPaginateRes({ limit, total, offset }),
		});
	},
);
