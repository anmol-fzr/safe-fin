import {
	index,
	integer,
	sqliteTable,
	text,
	unique,
} from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";

export const saved = sqliteTable(
	"saved",
	{
		id,
		entityType: text("entity_type", {
			enum: ["course", "chapter", "unit", "exercise"],
		}).notNull(),
		entityId: integer("entity_id").notNull(),
		userId: text("user_id")
			.references(() => user.id)
			.notNull(),

		createdAt: timestamp.createdAt,
		updatedAt: timestamp.updatedAt,
	},
	(t) => ({
		saved_pk: unique("ukq").on(t.entityType, t.entityId, t.userId),
		userEntityIdx: index("saved_user_entity_idx").on(
			t.userId,
			t.entityType,
			t.entityId,
		),
	}),
);
