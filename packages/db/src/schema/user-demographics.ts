import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

const occupations = [
	"salaried",
	"self-employed",
	"student",
	"non-working",
] as const;
const educationLevels = ["high-school", "graduate", "post-graduate"] as const;
const genders = ["male", "female", "others"] as const;

export const userDemographics = sqliteTable("user-demographics", {
	id: text("id").primaryKey(),
	userId: text("id")
		.unique()
		.notNull()
		.references(() => user.id),

	dob: integer("dob", { mode: "timestamp_ms" }).default(new Date(2000, 0, 1)),

	occupation: text("occupation", {
		mode: "text",
		enum: occupations,
	}).notNull(),
	country: text("country", { mode: "text" }).notNull(),
	state: text("country", { mode: "text" }).notNull(),
	city: text("country", { mode: "text" }).notNull(),

	educationLevel: text("education-level", {
		mode: "text",
		enum: educationLevels,
	}).notNull(),

	gender: text("gender", {
		enum: genders,
	}).default("male"),
});

export const userDemographicsRelations = relations(
	userDemographics,
	({ one }) => ({
		lesson: one(user, {
			fields: [userDemographics.userId],
			references: [user.id],
		}),
	}),
);
