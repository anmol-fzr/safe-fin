import { z } from "zod";

const entityTypeSchema = z.enum(["course", "chapter", "unit", "exercise"]);
type EntityType = z.infer<typeof entityTypeSchema>;

export type { EntityType };
export { entityTypeSchema };
