import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";

export const streak = sqliteTable("streak", {
	id,
	userId: text("user_id")
		.references(() => user.id)
		.notNull()
		.unique(),

	current: integer("current_streak").default(1).notNull(),
	maximum: integer("max_streak").default(1).notNull(),

	lastActivityDate: timestamp("last_activity_date").unique().notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const publicUserProfile = sqliteTable("public_user_profile", {
	id,
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),

	currentStreak: integer("current_streak").default(0),
	maxStreak: integer("max_streak").default(0),

	lastActivityDate: integer("last_activity_date", { mode: "timestamp" }),
	totalPX: integer("total_px"),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});
// table user_streak {
//   user_id text [pk, ref: > user.id]
//   current_streak integer
//   longest_streak integer
//   last_active_date text
// }

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
	// (table) => ({
	// 	userDateUnique: uniqueIndex("user_activity_user_date_idx").on(
	// 		table.userId,
	// 		table.date,
	// 	),
	// }),
);
