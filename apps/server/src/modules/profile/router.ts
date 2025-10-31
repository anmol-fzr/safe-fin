import { zValidator } from "@hono/zod-validator";
import { getDb } from "@safe-fin/db";
import { userDemographics } from "@safe-fin/db/schema";
import { env } from "hono/adapter";
import { createTypedFactory } from "@/factory";
import { authenticate } from "@/middleware";
import { insertDemoGraphicsSchema } from "./schema";

const { createApp } = createTypedFactory();

const profileRouter = createApp()
	.get("/", authenticate, async (c) => {
		const { id: userId } = c.get("user");

		const db = getDb(env(c));

		const data = await db.query.userDemographics.findFirst({
			where: (users, { eq }) => eq(users.userId, userId),
		});

		const isNew = typeof data === "undefined";

		return c.json({
			data: isNew ? null : { ...data },
			isNew,
		});
	})
	.post(
		"/",
		authenticate,
		zValidator("json", insertDemoGraphicsSchema),
		async (c) => {
			const { id: userId } = c.get("user");
			const body = c.req.valid("json");

			const db = getDb(env(c));

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
				message: "Profile Updated Successfully",
			});
		},
	);

export { profileRouter };
