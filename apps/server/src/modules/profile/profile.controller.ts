import { zValidator } from "@hono/zod-validator";
import { userDemographics } from "@safe-fin/db/schema";
import { createTypedFactory } from "@/factory";
import { authenticate, db, s3 } from "@/middleware";
import { isUndefined } from "@/pkg/utils";
import { PROFILE_CODES } from "./profile.codes";
import { insertDemoGraphicsSchema } from "./profile.schema";
import { z } from "zod";

const { createHandlers } = createTypedFactory();

export const getProfileActivity = createHandlers(
	authenticate,
	db,
	zValidator(
		"query",
		z.object({
			year: z.coerce
				.number()
				.int()
				.positive()
				.gte(2025)
				.lte(new Date().getFullYear())
				.optional()
				.default(new Date().getFullYear()),

			fromMonth: z.coerce.number().int().gte(0).lte(11).optional().default(0),
			toMonth: z.coerce.number().int().gte(0).lte(11).optional().default(11),
		}),
	),
	async (c) => {
		const { id: userId } = c.get("user");
		const db = c.get("db");
		const { year, fromMonth, toMonth } = c.req.valid("query");

		const start = new Date(Date.UTC(year, fromMonth, 1));
		const end = new Date(Date.UTC(year, toMonth, 31));

		const data = await db.query.userActivityLog.findMany({
			where: (activityLogs, { eq, and, gte, lte }) =>
				and(
					eq(activityLogs.userId, userId),
					gte(activityLogs.date, start),
					lte(activityLogs.date, end),
				),
		});

		return c.json({
			data,
		});
	},
);

export const getProfile = createHandlers(authenticate, db, async (c) => {
	const { id: userId } = c.get("user");
	const db = c.get("db");

	const data = await db.query.userDemographics.findFirst({
		where: (users, { eq }) => eq(users.userId, userId),
	});

	const isNew = isUndefined(data);

	return c.json({
		data: isNew ? null : { ...data },
		isNew,
	});
});

export const updateProfile = createHandlers(
	zValidator("json", insertDemoGraphicsSchema),
	authenticate,
	db,
	async (c) => {
		const { id: userId } = c.get("user");
		const body = c.req.valid("json");
		const db = c.get("db");

		const [data] = await db
			.insert(userDemographics)
			.values({ ...body, userId })
			.onConflictDoUpdate({
				target: userDemographics.userId,
				set: body,
			})
			.returning();

		return c.json({
			data,
			message: PROFILE_CODES.UPDATE.SUCCESS,
		});
	},
);

const uploadSchema = z.object({
	fileName: z.string(),
});

export const getAvatarObjectUploadUrl = createHandlers(
	authenticate,
	s3,
	zValidator("json", uploadSchema),
	async (c) => {
		const { fileName } = c.req.valid("json");
		const storage = c.get("storage");
		const type = "avatar";

		const key = `users/${type}/${crypto.randomUUID()}-${fileName}`;

		const result = await storage.getUploadUrl(key, 600);

		return c.json(result);
	},
);
