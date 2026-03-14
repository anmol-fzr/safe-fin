import type {
	InsertChapter,
	InsertCourse,
	InsertRichContent,
	InsertRichContentItem,
	InsertUnit,
} from "@/schema";

import { faker } from "@faker-js/faker/locale/en";

interface FakeUnit extends Omit<InsertUnit, "contentId" | "chapterId"> {
	content: {
		title: string;
		shortDesc: string;
		longDesc: InsertRichContentItem;
	};
}

interface FakeChapter extends Omit<InsertChapter, "courseId"> {
	units: FakeUnit[];
}

export type FakeCourse = Omit<InsertCourse, "contentId"> & {
	content: Omit<InsertRichContent, "longDescRichId"> & {
		longDesc: InsertRichContentItem;
	};
	chapters: FakeChapter[];
};

function generateRichContentItem(): InsertRichContentItem {
	return {
		content: faker.lorem.paragraphs({ min: 3, max: 6 }),
		contentJson: {
			type: "doc",
			content: [
				{
					type: "paragraph",
					attrs: { textAlign: null },
					content: [
						{
							type: "text",
							text: faker.lorem.paragraph(),
						},
					],
				},
			],
		},
	};
}

function generateUnit(index: number): FakeUnit {
	return {
		index,
		isPublished: true,
		points: faker.number.int({ min: 50, max: 500 }),

		content: {
			title: faker.lorem.words({ min: 2, max: 5 }),
			shortDesc: faker.lorem.sentence(),
			longDesc: generateRichContentItem(),
		},
	};
}

function generateChapter(index: number): FakeChapter {
	const unitCount = faker.number.int({ min: 4, max: 8 });

	return {
		title: faker.lorem.words({ min: 3, max: 6 }),
		index,
		isPublished: true,

		units: Array.from({ length: unitCount }, (_, i) => generateUnit(i)),
	};
}

function generateCourse(): FakeCourse {
	const chapterCount = faker.number.int({ min: 3, max: 6 });

	const rateCount = faker.number.int({ min: 5, max: 200 });
	const ratingSum = faker.number.int({
		min: rateCount * 3,
		max: rateCount * 5,
	});

	return {
		coverPath: `courses/cover/${faker.string.uuid()}.png`,
		level: faker.helpers.arrayElement(["beginner", "intermediate", "advanced"]),
		isPublished: faker.datatype.boolean(),
		rateCount,
		ratingSum,

		content: {
			title: faker.company.catchPhrase(),
			shortDesc: faker.lorem.sentence(),
			longDesc: generateRichContentItem(),
		},

		chapters: Array.from({ length: chapterCount }, (_, i) =>
			generateChapter(i),
		),
	};
}

export function getFakeCourses(
	length = 10,
	options?: { seed?: number },
): FakeCourse[] {
	if (options?.seed !== undefined) {
		faker.seed(options.seed);
	}

	return Array.from({ length }, () => generateCourse());
}
