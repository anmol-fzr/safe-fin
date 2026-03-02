import {
	and,
	count,
	course,
	type DB,
	eq,
	richContent,
	richContentItem,
	saved,
} from "@/pkg/db";
import type { PaginateReqArgs } from "@/types";
import type { EntityType } from "./saved.schema";

interface ToggleSaveArgs {
	userId: string;
	entityType: EntityType;
	entityId: number;
}

interface GetSavedEntityArgs extends PaginateReqArgs {
	userId: string;
	entityType: EntityType;
}

export class SavedService {
	static async saveEntity(db: DB, args: ToggleSaveArgs) {
		const { userId, entityType, entityId } = args;
		return await db.insert(saved).values({
			userId,
			entityType,
			entityId,
		});
	}

	static async unSaveEntity(db: DB, args: ToggleSaveArgs) {
		const { userId, entityType, entityId } = args;
		return await db
			.delete(saved)
			.where(
				and(
					eq(saved.entityType, entityType),
					eq(saved.entityId, entityId),
					eq(saved.userId, userId),
				),
			);
	}

	static async toggleEntitySave(db: DB, args: ToggleSaveArgs) {
		try {
			await this.saveEntity(db, args);

			return { saved: true };
		} catch (err) {
			await this.unSaveEntity(db, args);

			return { saved: false };
		}
	}

	static async getSavedEntity(
		db: DB,
		{ userId, entityType, limit, offset }: GetSavedEntityArgs,
	) {
		const filter = and(
			eq(saved.userId, userId),
			eq(saved.entityType, entityType),
		);

		const query = db
			.select({
				id: saved.id,
				type: saved.entityType,
				entity:
					entityType === "course"
						? {
								id: course.id,
								coverPath: course.coverPath,
								content: {
									title: richContent.title,
									shortDesc: richContent.shortDesc,
								},
							}
						: saved.entityType,
			})
			.from(saved)
			.limit(limit)
			.offset(offset)
			.where(filter)
			.leftJoin(course, eq(saved.entityId, course.id))
			.leftJoin(richContent, eq(course.contentId, richContent.id))
			.leftJoin(
				richContentItem,
				eq(richContent.longDescRichId, richContentItem.id),
			);

		const countQuery = db.select({ count: count() }).from(saved).where(filter);

		const [data, total] = await Promise.all([query, countQuery]);
		return { data, total: total[0].count };
	}
}
