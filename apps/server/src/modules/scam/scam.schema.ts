import { idParamSchema } from "@/schema";
import z from "zod";

export const scamIdParamSchema = z.object({ scamId: idParamSchema });
