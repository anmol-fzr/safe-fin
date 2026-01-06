import { z } from "zod";

export const lessonStatusQuerySchema = z.object({
	status: z.enum(["seen", "red"]).default("seen"),
});
