import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
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
		.unique()
		.notNull(),
	totalPX: integer("total_px"),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const userActivityLog = sqliteTable(
	"user_activity_log",
	{
		userId: text("user_id")
			.notNull()
			.references(() => user.id),

		// Store as unix timestamp (recommended for SQLite)
		date: integer("date", { mode: "timestamp" }).notNull(),

		totalPxEarned: integer("total_px").notNull().default(0),

		createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
		updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
	},
	(table) => ({
		pk: primaryKey({
			columns: [table.userId, table.date],
			name: "user_activity_user_date_pk",
		}),
	}),
);
// , (table) => [
//   primaryKey({ columns: [table.bookId, table.authorId] }),
//   // Or PK with custom name
//   primaryKey({ name: 'custom_name', columns: [table.bookId, table.authorId] })
// ]
