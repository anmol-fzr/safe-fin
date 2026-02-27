import { and, eq, getDb, sql, userProfileLink } from "@/pkg/db";

const db = getDb();

export const userProfileLinkQueries = {
	delete: db
		.delete(userProfileLink)
		.where(
			and(
				eq(userProfileLink.id, sql.placeholder("id")),
				eq(userProfileLink.userId, sql.placeholder("userId")),
			),
		)
		.prepare(),
	insert: db
		.insert(userProfileLink)
		.values({
			userId: sql.placeholder("userId"),
			link: sql.placeholder("link"),
		})
		.returning()
		.prepare(),
} as const;
