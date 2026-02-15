import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

const occupations = [
	"salaried",
	"self-employed",
	"student",
	"non-working",
] as const;
const educationLevels = ["high-school", "graduate", "post-graduate"] as const;
const genders = ["male", "female", "others"] as const;

export type Occupation = (typeof occupations)[number];
export type EducationLevel = (typeof educationLevels)[number];
export type Gender = (typeof genders)[number];

export const userDemographics = sqliteTable(
	"user-demographics",
	{
		id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
		userId: text("user_id")
			.unique()
			.notNull()
			.references(() => user.id),

		dob: integer("dob", { mode: "timestamp_ms" }).default(new Date(2000, 0, 1)),

		occupation: text("occupation", {
			mode: "text",
			enum: occupations,
		}).notNull(),

		country: text("country", { mode: "text" }).notNull(),
		state: text("state", { mode: "text" }).notNull(),
		city: text("city", { mode: "text" }).notNull(),

		educationLevel: text("education-level", {
			mode: "text",
			enum: educationLevels,
		}).notNull(),

		gender: text("gender", {
			enum: genders,
		}).default("male"),

		createdAt: integer("created_at", { mode: "timestamp_ms" }).default(
			sql`(cast(unixepoch('subsecond') * 1000 as integer))`,
		),
		updatedAt: integer("updated_at", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.$onUpdate(() => /* @__PURE__ */ new Date()),
	},
	(t) => ({
		userIdIdx: index("user_id_idx").on(t.userId),
	}),
);

export const userDemographicsRelations = relations(
	userDemographics,
	({ one }) => ({
		lesson: one(user, {
			fields: [userDemographics.userId],
			references: [user.id],
		}),
	}),
);
