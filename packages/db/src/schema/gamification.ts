import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";

export const publicUserProfile = sqliteTable("public_user_profile", {
	id,
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),

	currentStreakDaysCount: integer("current_streak_days_count").default(0),
	lastActivityDate: integer("last_activity_date", { mode: "timestamp" }),
	totalPX: integer("total_px"),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const publicUserActivityLog = sqliteTable("public_user_activity_log", {
	id,
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),

	date: integer("date", { mode: "timestamp" }).unique(),
	totalPxEarned: integer("total_px"),

	updatedAt: timestamp.updatedAt,
});
