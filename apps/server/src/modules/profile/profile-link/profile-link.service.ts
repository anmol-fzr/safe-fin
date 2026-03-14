import type { User } from "@safe-fin/auth";
import { errAsync, okAsync } from "neverthrow";
import { Reason } from "@/modules/_utils/reasons";
import { type ResourceId, ResourceService } from "@/modules/_utils/service";
import {
	and,
	eq,
	getDb,
	type InsertUserProfileLink,
	type SelectUserProfileLink,
	userProfileLink,
} from "@/pkg/db";

export class ProfileLinkService extends ResourceService<
	SelectUserProfileLink,
	InsertUserProfileLink,
	InsertUserProfileLink
> {
	async create(payload: InsertUserProfileLink) {
		const db = getDb();
		try {
			const result = await db
				.insert(userProfileLink)
				.values({
					userId: payload.userId,
					link: payload.link,
				})
				.returning();

			if (result.length === 0) {
				console.info("No Rows Inserted");
				return errAsync({
					reason: Reason.UnExpected,
				} as const);
			}

			return okAsync({
				data: result[0],
			} as const);
		} catch (error) {
			return errAsync({
				reason: Reason.UnExpected,
				error: error,
			} as const);
		}
	}

	async deleteById(id: ResourceId, user: User) {
		const db = getDb();
		try {
			const result = await db
				.delete(userProfileLink)
				.where(
					and(eq(userProfileLink.id, id), eq(userProfileLink.userId, user.id)),
				);

			if (!result.success) {
				console.info("No Rows Inserted");
				return errAsync({
					reason: Reason.UnExpected,
				} as const);
			}

			return okAsync({
				success: true,
			} as const);
		} catch (error) {
			return errAsync({
				reason: Reason.UnExpected,
				error: error,
			} as const);
		}
	}
}
