import { getDb, streak } from "@/pkg/db";
import type { User } from "@safe-fin/auth";
import { eq } from "@/pkg/db";

function startOfDay(date: Date) {
	date.setHours(0, 0, 0, 0);
	return date;
}

function isSameDate(date1: Date, date2: Date) {
	return startOfDay(date1).getTime() === startOfDay(date2).getTime();
}

enum StreakCreationStatus {
	New = "new",
	Reset = "reset",
	Continued = "continued",
	Same = "Same",
}

class StreakService {
	async create(user: User): Promise<{
		current: number;
		maximum: number;
		status: StreakCreationStatus;
	}> {
		const db = getDb();

		const foundStreak = await db.query.streak.findFirst({
			where: (streaks, { eq }) => eq(streaks.userId, user.id),
		});

		if (foundStreak === undefined) {
			await db.insert(streak).values({
				userId: user.id,
				current: 1,
				lastActivityDate: startOfDay(new Date()),
			});

			return {
				current: 1,
				maximum: 1,
				status: StreakCreationStatus.New,
			};
		}

		const isSameDay = isSameDate(new Date(), foundStreak.lastActivityDate);

		if (isSameDay) {
			return {
				current: foundStreak.current,
				maximum: foundStreak.maximum,
				status: StreakCreationStatus.Same,
			};
		}

		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		const isExactlyYesterday = isSameDate(
			yesterday,
			foundStreak.lastActivityDate,
		);

		if (isExactlyYesterday) {
			const updatedStreak = await db
				.update(streak)
				.set({
					userId: user.id,
					current: foundStreak.current + 1,
					maximum:
						foundStreak.current + 1 > foundStreak.maximum
							? foundStreak.current + 1
							: foundStreak.maximum,
					lastActivityDate: startOfDay(new Date()),
				})
				.where(eq(streak.id, foundStreak.id))
				.returning();

			return {
				current: updatedStreak[0].current,
				maximum: updatedStreak[0].maximum,
				status: StreakCreationStatus.Continued,
			};
		}

		await db
			.update(streak)
			.set({
				userId: user.id,
				current: 1,
				maximum: 1,
				lastActivityDate: startOfDay(new Date()),
			})
			.where(eq(streak.id, foundStreak.id))
			.returning();

		return {
			current: 1,
			maximum: 1,
			status: StreakCreationStatus.Reset,
		};
	}
}

export { StreakService };
