import { z } from "zod";

const pageSearchSchema = z.object({
	query: z.string().default("").catch(""),
});

export { pageSearchSchema };
