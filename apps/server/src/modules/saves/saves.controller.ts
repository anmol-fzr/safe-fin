import { and, type DB, eq, saved } from "@/pkg/db";

interface ToggleSaveArgs {
	userId: string;
	entityType: "course";
	entityId: number;
}

async function toggleEntitySave(
	db: DB,
	{ userId, entityType, entityId }: ToggleSaveArgs,
) {
	try {
		await db.insert(saved).values({
			userId,
			entityType,
			entityId,
		});

		return { saved: true };
	} catch (err) {
		await db
			.delete(saved)
			.where(
				and(
					eq(saved.userId, userId),
					eq(saved.entityType, entityType),
					eq(saved.entityId, entityId),
				),
			);

		return { saved: false };
	}
}

export { toggleEntitySave };
