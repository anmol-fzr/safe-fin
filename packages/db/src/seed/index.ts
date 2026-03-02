import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { envs } from "@/envs";
import * as schema from "@/schema"; // adjust path
import { getFakeUsers } from "./auth";
import { getFakeCalculators } from "./calculator";
import { getFakeCourses } from "./course";

const dbPath = envs.DB.URL;

if (!dbPath) {
	console.error("Missing DB URL");
}

const sqlite = new Database(dbPath);
const db = drizzle(sqlite, {
	schema,
});

async function seed() {
	await seedUsers();
	await seedCalculators();
	await seedCourses();
}

async function seedUsers() {
	const fakerUsers = getFakeUsers();

	await db.insert(schema.user).values(fakerUsers).onConflictDoNothing;
}

async function seedCalculators() {
	const fakerCalculators = getFakeCalculators();

	await db
		.insert(schema.calculator)
		.values(fakerCalculators)
		.onConflictDoNothing();
}

async function seedCourses() {
	const fakeCourses = getFakeCourses();

	await db.transaction(async (tx) => {
		for (const c of fakeCourses) {
			const [courseLongDesc] = await tx
				.insert(schema.richContentItem)
				.values({
					content: c.content.longDesc.content,
					contentJson: c.content.longDesc.contentJson,
				})
				.returning();

			const [courseContent] = await tx
				.insert(schema.richContent)
				.values({
					title: c.content.title,
					shortDesc: c.content.shortDesc,
					longDescRichId: courseLongDesc.id,
				})
				.returning();

			const [insertedCourse] = await tx
				.insert(schema.course)
				.values({
					contentId: courseContent.id,
					coverPath: c.coverPath,
					level: c.level,
					isPublished: c.isPublished,
					ratingSum: c.ratingSum,
					rateCount: c.rateCount,
				})
				.returning();

			for (const ch of c.chapters) {
				const [insertedChapter] = await tx
					.insert(schema.chapter)
					.values({
						courseId: insertedCourse.id,
						title: ch.title,
						index: ch.index,
						isPublished: ch.isPublished,
					})
					.returning();

				for (const u of ch.units) {
					const [unitLongDesc] = await tx
						.insert(schema.richContentItem)
						.values({
							content: u.content.longDesc.content,
							contentJson: u.content.longDesc.contentJson,
						})
						.returning();

					const [unitContent] = await tx
						.insert(schema.richContent)
						.values({
							title: u.content.title,
							shortDesc: u.content.shortDesc,
							longDescRichId: unitLongDesc.id,
						})
						.returning();

					await tx.insert(schema.unit).values({
						chapterId: insertedChapter.id,
						contentId: unitContent.id,
						points: u.points,
						index: u.index,
						isPublished: u.isPublished,
					});
				}
			}
		}
	});
}

seed().catch((err) => {
	console.error(err);
});
