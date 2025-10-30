import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";

export const resourceStatus = sqliteTable("resource_status", {
	id,
	resource: text("resource", { enum: ["quiz", "lesson"] }).notNull(),
	// will loose the functionality of reference due to dynamic ids
	resourceId: integer("resource_id").notNull(),
	status: text("status", { enum: ["started", "finished"] }).default("started"),
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),
	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const resourceStatusRelations = relations(resourceStatus, ({ one }) => ({
	user: one(user, {
		fields: [resourceStatus.userId],
		references: [user.id],
	}),
}));
