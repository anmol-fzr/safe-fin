import { z } from "zod";

const pageSearchSchema = z.object({
	query: z.string().default("").catch(""),
});

const usersPageSearchSchema = z.object({
	name: z.string().default("").catch(""),
});

export { pageSearchSchema, usersPageSearchSchema };
