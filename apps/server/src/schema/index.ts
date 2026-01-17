import { z } from "zod";

const dbIdSchema = z.coerce.number().int().positive().safe();
const idParamSchema = z.coerce.number().int().positive().safe();

export { dbIdSchema, idParamSchema };
