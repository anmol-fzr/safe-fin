import { getDb, publicUserProfile, streak } from "@/pkg/db";
import { startOfDay } from "../streak/streak.service";
import { sql } from "@/pkg/db";

const db = getDb();

const streakInitQuery = db
	.insert(streak)
	.values({
		userId: sql.placeholder("userId"),
		current: 1,
		maximum: 1,
		lastActivityDate: startOfDay(new Date()),
	})
	.onConflictDoNothing();

const publicProfileInitQuery = db
	.insert(publicUserProfile)
	.values({
		userId: sql.placeholder("userId"),
		totalPX: 0,
	})
	.onConflictDoNothing();

export { streakInitQuery, publicProfileInitQuery };
