import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { createTypedFactory } from "@/factory";
import { authenticate, db, s3, weakAuthenticate } from "@/middleware";
import {
	and,
	count,
	courseProgress,
	eq,
	sum,
	userActivityLog,
	userDemographics,
} from "@/pkg/db";
import { isUndefined } from "@/pkg/utils";
import { PROFILE_CODES } from "./profile.codes";
import { insertDemoGraphicsSchema } from "./profile.schema";

const { createHandlers } = createTypedFactory();

const getProfileActivitySchema = z.object({
	year: z.coerce
		.number()
		.int()
		.positive()
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
				id: true,
				name: true,
				bio: true,
				//email: true,
				image: true,
				createdAt: true,
			},
			with: {
				links: {
					columns: {
						id: true,
						link: true,
					},
					orderBy: (links, { desc }) => desc(links.createdAt),
				},
				streak: {
					columns: {
						current: true,
						maximum: true,
						lastActivityDate: true,
					},
				},
			},
		});

		// const publicUserProfileQuery = db.query.publicUserProfile.findFirst({
		// 	where: (profiles, { eq }) => eq(profiles.userId, userId),
		// 	columns: {
		// 		totalPX: true,
		// 	},
		// });

		const { year, fromMonth, toMonth } = c.req.valid("query");

		const start = new Date(Date.UTC(year, fromMonth, 1));
		const end = new Date(Date.UTC(year, toMonth, 31));

		const userYearActivityQuery = db.query.userActivityLog.findMany({
			where: (activityLogs, { eq, and, gte, lte }) =>
				and(
					eq(activityLogs.userId, userId),
					gte(activityLogs.date, start),
					lte(activityLogs.date, end),
				),
			columns: {
				date: true,
				totalPxEarned: true,
			},
		});

		const userMonthActivityQuery = db.query.userActivityLog.findMany({
			where: (activityLogs, { eq, and, gte, lte }) =>
				and(
					eq(activityLogs.userId, userId),
					gte(
						activityLogs.date,
						new Date(Date.UTC(year, new Date().getMonth(), 1)),
					),
					lte(
						activityLogs.date,
						new Date(Date.UTC(year, new Date().getMonth(), 31)),
					),
				),
			columns: {
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

		const userXpQuery = db
			.select({ value: sum(userActivityLog.totalPxEarned) })
			.from(userActivityLog)
			.where(eq(userActivityLog.userId, userId));

		const [
			userData,
			userYearActivityData,
			userMonthActivityData,
			userCourseProgressData,
			userXpData,
		] = await Promise.all([
			userDataQuery,
			userYearActivityQuery,
			userMonthActivityQuery,
			userCourseProgress,
			userXpQuery,
		]);
		console.log(userXpData);

		return c.json({
			data: {
				user: userData,
				profile: {
					totalPX: Number(userXpData[0].value) ?? 0,
					courses: userCourseProgressData[0].count,
				},
				activity: {
					year: userYearActivityData,
					month: userMonthActivityData,
				},
			},
		});
	},
);
