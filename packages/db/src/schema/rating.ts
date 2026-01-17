//import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";

export const rating = sqliteTable("rating", {
	id,
	rating: integer({ mode: "number" }).notNull(), // rating b/w 0 -> 5
	review: text(), // rating b/w 0 -> 5
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

// export const userReviewRelations = relations(user, ({ many }) => ({
// 	reviews: many(user),
// }));
