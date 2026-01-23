import {
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";

export const publicUserProfile = sqliteTable("public_user_profile", {
	id,
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),

	currentStreakDaysCount: integer("current_streak_days_count").default(0),
	maxStreakDaysCount: integer("max_streak_days_count").default(0),

	lastActivityDate: integer("last_activity_date", { mode: "timestamp" }),
	totalPX: integer("total_px"),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const userActivityLog = sqliteTable(
	"user_activity_log",
	{
		id,
		userId: text("user_id")
			.references(() => user.id)
			.notNull(),

		date: timestamp("date").notNull(),
		totalPxEarned: integer("total_px").notNull().default(0),

		createdAt: timestamp.createdAt,
		updatedAt: timestamp.updatedAt,
	},
	(table) => ({
		userDateUnique: uniqueIndex("user_activity_user_date_idx").on(
			table.userId,
			table.date,
		),
	}),
);
