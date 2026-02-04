import { zValidator } from "@hono/zod-validator";
import { courseProgress, userDemographics } from "@safe-fin/db/schema";
import { createTypedFactory } from "@/factory";
import { authenticate, db, s3, weakAuthenticate } from "@/middleware";
import { isUndefined } from "@/pkg/utils";
import { PROFILE_CODES } from "./profile.codes";
import { insertDemoGraphicsSchema } from "./profile.schema";
import { z } from "zod";
import { and, count, eq } from "drizzle-orm";

const { createHandlers } = createTypedFactory();

const getProfileActivitySchema = z.object({
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
});

export const getProfileActivity = createHandlers(
	authenticate,
	db,
	zValidator("query", getProfileActivitySchema),
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

const getPublicProfileSchema = z
	.object({
		userId: z.string().optional(),
	})
	.merge(getProfileActivitySchema);

export const getPublicProfile = createHandlers(
	weakAuthenticate,
	zValidator("query", getPublicProfileSchema),
	db,
	async (c) => {
		const user = c.get("user");
		const { userId: queryUserId } = c.req.valid("query");
		const db = c.get("db");

		const userId = queryUserId ?? user?.id;

		if (isUndefined(userId)) {
			return c.json({
				success: false,
				error: {
					issues: [
						{
							code: "invalid_type",
							expected: "string",
							received: "undefined",
							path: ["userId"],
							message: "Required",
						},
					],
					name: "ZodError",
				},
			});
		}

		// const data = await db.query.userDemographics.findFirst({
		// 	where: (users, { eq }) => eq(users.userId, userId),
		// });

		const userDataQuery = db.query.user.findFirst({
			where: (users, { eq }) => eq(users.id, userId),
			columns: {
				name: true,
				//email: true,
				image: true,
				createdAt: true,
			},
		});

		const publicUserProfileQuery = db.query.publicUserProfile.findFirst({
			where: (profiles, { eq }) => eq(profiles.userId, userId),
			// columns: {
			// 	name: true,
			// 	//email: true,
			// 	image: true,
			// 	createdAt: true,
			// },
		});

		const { year, fromMonth, toMonth } = c.req.valid("query");

		const start = new Date(Date.UTC(year, fromMonth, 1));
		const end = new Date(Date.UTC(year, toMonth, 31));

		const userActivityQuery = db.query.userActivityLog.findMany({
			where: (activityLogs, { eq, and, gte, lte }) =>
				and(
					eq(activityLogs.userId, userId),
					gte(activityLogs.date, start),
					lte(activityLogs.date, end),
				),
			columns: {
				id: true,
				date: true,
				totalPxEarned: true,
			},
		});

		const userCourseProgress = db
			.select({ count: count() })
			.from(courseProgress)
			.where(
				and(
					eq(courseProgress.userId, userId),
					eq(courseProgress.isCompleted, true),
				),
			);

		const [
			userData,
			publicUserProfileData,
			userActivityData,
			userCourseProgressData,
		] = await Promise.all([
			userDataQuery,
			publicUserProfileQuery,
			userActivityQuery,
			userCourseProgress,
		]);

		return c.json({
			data: {
				user: userData,
				profile: {
					currentStreak: publicUserProfileData?.currentStreak ?? 0,
					maxStreak: publicUserProfileData?.maxStreak ?? 0,
					totalPX: publicUserProfileData?.totalPX ?? 0,
					courses: userCourseProgressData[0].count,
				},
				activity: userActivityData,
			},
		});
	},
);
