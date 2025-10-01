import { z } from "zod";

const dbIdSchema = z.number().int().positive().safe();

export { dbIdSchema };
