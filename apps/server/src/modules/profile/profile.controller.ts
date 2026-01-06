import { zValidator } from "@hono/zod-validator";
import { userDemographics } from "@safe-fin/db/schema";
import { createTypedFactory } from "@/factory";
import { authenticate, db } from "@/middleware";
import { isUndefined } from "@/pkg/utils";
import { PROFILE_CODES } from "./profile.codes";
import { insertDemoGraphicsSchema } from "./profile.schema";

const { createHandlers } = createTypedFactory();

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
