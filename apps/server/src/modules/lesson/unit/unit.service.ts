import type { DB } from "@/pkg/db";
import { eq, richContent, richContentItem, unit } from "@/pkg/db";

interface CreateUnitData {
	title: string;
	shortDesc: string;
	longDesc: {
		content: string;
		contentJson?: any;
	};
	index: number;
	points: number;
	coverPath?: string | undefined;
}

interface UpdateUnitData {
	title?: string;
	shortDesc?: string;
	content?: string;
	contentJson?: any;
	coverPath?: string;
	points?: number;
	index?: number;
	isPublished?: boolean;
}

export class UnitService {
	static async getUnitsByChapterId(
		db: DB,
		chapterId: number,
		includeUnpublished = false,
	) {
		const units = await db.query.unit.findMany({
			where: (u, { eq, and }) => {
				const conditions = [eq(u.chapterId, chapterId)];
				if (!includeUnpublished) {
					conditions.push(eq(u.isPublished, true));
				}
				return and(...conditions);
			},
			orderBy: (u, { asc }) => [asc(u.index)],
			columns: {
				id: true,
				coverPath: true,
				points: true,
				index: true,
				isPublished: true,
				createdAt: true,
				updatedAt: true,
			},
			with: {
				content: {
					columns: {
						title: true,
						shortDesc: true,
					},
					with: {
						longDesc: {
							columns: {
								content: true,
								contentJson: true,
							},
						},
					},
				},
			},
		});

		return units;
	}

	static async getById(db: DB, unitId: number, isAdmin = false) {
		const foundUnit = await db.query.unit.findFirst({
			where: (u, { eq, and }) => {
				const conditions = [eq(u.id, unitId)];
				if (!isAdmin) {
					conditions.push(eq(u.isPublished, true));
				}
				return and(...conditions);
			},
			with: {
				content: {
					with: {
						longDesc: {
							columns: {
								content: true,
								contentJson: isAdmin,
							},
						},
					},
				},
			},
		});

		return foundUnit;
	}

	static async create(
		db: DB,
		data: { chapterId: number; units: CreateUnitData[] },
	) {
		const { chapterId, units } = data;
		const richContentItemsData = units.map((unit) => ({
			content: unit.longDesc.content,
			contentJson: unit.longDesc.contentJson || {},
		}));

		const insertedRichContentItems = await db
			.insert(richContentItem)
			.values(richContentItemsData)
			.returning();

		const richContentData = units.map((unit, idx) => ({
			title: unit.title,
			shortDesc: unit.shortDesc,
			longDescRichId: insertedRichContentItems[idx].id,
		}));

		const insertedRichContents = await db
			.insert(richContent)
			.values(richContentData)
			.returning();

		const unitsData = units.map((unit, idx) => ({
			chapterId,
			contentId: insertedRichContents[idx].id,
			coverPath: unit.coverPath,
			points: unit.points || 10,
			index: unit.index,
			isPublished: false,
		}));

		const insertedUnits = await db.insert(unit).values(unitsData).returning();

		return insertedUnits;
	}

	static async updateById(db: DB, unitId: number, data: UpdateUnitData) {
		if (data.title || data.shortDesc || data.content || data.contentJson) {
			const existingUnit = await db.query.unit.findFirst({
				where: (u, { eq }) => eq(u.id, unitId),
				with: {
					content: {
						with: {
							longDesc: true,
						},
					},
				},
			});

			if (!existingUnit) {
				throw new Error("Unit not found");
			}

			if (data.content || data.contentJson) {
				await db
					.update(richContentItem)
					.set({
						...(data.content && { content: data.content }),
						...(data.contentJson && { contentJson: data.contentJson }),
					})
					.where(eq(richContentItem.id, existingUnit.content.longDescRichId));
			}

			if (data.title || data.shortDesc) {
				await db
					.update(richContent)
					.set({
						...(data.title && { title: data.title }),
						...(data.shortDesc && { shortDesc: data.shortDesc }),
					})
					.where(eq(richContent.id, existingUnit.contentId));
			}
		}

		const unitUpdateData: any = {};
		if (data.coverPath !== undefined) unitUpdateData.coverPath = data.coverPath;
		if (data.points !== undefined) unitUpdateData.points = data.points;
		if (data.index !== undefined) unitUpdateData.index = data.index;
		if (data.isPublished !== undefined)
			unitUpdateData.isPublished = data.isPublished;

		if (Object.keys(unitUpdateData).length > 0) {
			await db.update(unit).set(unitUpdateData).where(eq(unit.id, unitId));
		}

		return this.getById(db, unitId, true);
	}

	static async reorderUnits(
		db: DB,
		units: Array<{ id: number; index: number }>,
	) {
		for (const u of units) {
			await db.update(unit).set({ index: u.index }).where(eq(unit.id, u.id));
		}

		return { success: true };
	}

	static async delete(db: DB, unitId: number) {
		return db.delete(unit).where(eq(unit.id, unitId));
	}
}
