import { createTypedFactory } from "@/factory";
import {
	createUnits,
	deleteUnit,
	getChapterUnits,
	getUnitById,
	reorderUnits,
	updateUnit,
} from "./unit.controller";

const { createApp } = createTypedFactory();

const unitRouter = createApp()
	.get("/chapters/:chapterId/units", ...getChapterUnits)
	.post("/chapters/:chapterId/units", ...createUnits)
	.post("/units/reorder", ...reorderUnits)
	.get("/units/:unitId", ...getUnitById)
	.patch("/units/:unitId", ...updateUnit)
	.delete("/units/:id", ...deleteUnit);

export { unitRouter };
