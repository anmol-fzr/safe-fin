import { createTypedFactory } from "@/factory";
import { authenticate, userRole } from "@/middleware";
import { StreakService } from "./streak.service";

const { createHandlers } = createTypedFactory();

const streakService = new StreakService();

export const createStreak = createHandlers(
	authenticate,
	//userRole("user"),
	async (c) => {
		const user = c.get("user");

		const result = await streakService.create(user);

		return c.json({ data: result });
	},
);
