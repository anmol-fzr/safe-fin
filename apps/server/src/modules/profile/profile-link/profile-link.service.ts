import type { User } from "@safe-fin/auth";
import { errAsync, okAsync } from "neverthrow";
import { Reason } from "@/modules/_utils/reasons";
import { type ResourceId, ResourceService } from "@/modules/_utils/service";
import {
	type InsertUserProfileLink,
	type SelectUserProfileLink,
} from "@/pkg/db";
import { userProfileLinkQueries } from "./profile-link.queries";

export class ProfileLinkService extends ResourceService<
	SelectUserProfileLink,
	InsertUserProfileLink,
	InsertUserProfileLink
> {
	async create(payload: InsertUserProfileLink) {
		try {
			const result = await userProfileLinkQueries.insert.execute({
				userId: payload.userId,
				link: payload.link,
			});

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
		try {
			const result = await userProfileLinkQueries.delete.execute({
				id,
				userId: user.id,
			});

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
