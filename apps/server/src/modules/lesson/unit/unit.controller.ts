import { zValidator } from "@hono/zod-validator";
import type { DB } from "@/pkg/db";
import { z } from "zod";
import { createTypedFactory } from "@/factory";
import { authenticate, db, userRole } from "@/middleware";
import { dbIdSchema, idParamSchema } from "@/schema";
import {
	createUnitSchema,
	getChapterUnitsQuerySchema,
	reorderUnitsSchema,
	updateUnitSchema,
} from "./unit.schema";
import { UnitService } from "./unit.service";

const { createHandlers } = createTypedFactory();

export const getChapterUnits = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ chapterId: dbIdSchema })),
	zValidator("query", getChapterUnitsQuerySchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");
		const { chapterId } = c.req.valid("param");
		const { includeUnpublished } = c.req.valid("query");

		const canSeeUnpublished = user.role === "admin" && includeUnpublished;
		const units = await UnitService.getUnitsByChapterId(
			db,
			chapterId,
			canSeeUnpublished,
		);

		return c.json({ data: units });
	},
);

export const getUnitById = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ unitId: idParamSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");
		const { unitId } = c.req.valid("param");

		const unit = await UnitService.getById(db, unitId, user);

		if (!unit) {
			return c.json({ error: "Unit not found" }, 404);
		}

		return c.json({ data: unit });
	},
);

export const createUnits = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("param", z.object({ chapterId: idParamSchema })),
	zValidator("json", createUnitSchema),
	async (c) => {
		const db = c.get("db");

		const { units, isPublished } = c.req.valid("json");
		const { chapterId } = c.req.valid("param");
		const newUnits = await UnitService.create(db, {
			chapterId,
			units,
			isPublished,
		});

		return c.json({ data: newUnits }, 201);
	},
);

export const updateUnit = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("param", z.object({ unitId: idParamSchema })),
	zValidator("json", updateUnitSchema),
	async (c) => {
		const db = c.get("db");

		const { unitId } = c.req.valid("param");
		const data = c.req.valid("json");

		const updatedUnit = await UnitService.updateById(db, unitId, data);

		if (!updatedUnit) {
			return c.json({ error: "Unit not found" }, 404);
		}

		return c.json({ data: updatedUnit });
	},
);

export const reorderUnits = createHandlers(
	authenticate,
	db,
	zValidator("json", reorderUnitsSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can reorder units
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { units } = c.req.valid("json");
		const result = await UnitService.reorderUnits(db, units);

		return c.json({ data: result });
	},
);

export const deleteUnit = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can delete units
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { id } = c.req.valid("param");
		await UnitService.delete(db, id);

		return c.json({ success: true });
	},
);
