import { zValidator } from "@hono/zod-validator";
import { db, getPaginateRes, paginate } from "@/middleware";
import { itemIdSchema, queryParamSchema } from "@/schema/params";
import { createTypedFactory } from "../../factory";
import { CALCULATOR_CODES, CalculatorErrors } from "./calculator.codes";
import { calculatorMetadataSchema } from "./calculator.schema";
import { CalculatorService } from "./calculator.service";

const { createHandlers } = createTypedFactory();

export const getCalculators = createHandlers(
	zValidator("query", queryParamSchema),
	paginate,
	db,
	async (c) => {
		const { limit, offset } = c.get("paginate");
		const db = c.get("db");

		const { calculators, total } = await CalculatorService.getAll(
			db,
			limit,
			offset,
		);

		const formatted = calculators.map((calc) => ({
			id: calc.id,
			...JSON.parse(calc.text),
		}));

		return c.json({
			data: formatted,
			paginate: getPaginateRes({ total, offset, limit }),
		});
	},
);

export const createCalculator = createHandlers(
	zValidator("json", calculatorMetadataSchema),
	db,
	async (c) => {
		const body = c.req.valid("json");
		const db = c.get("db");

		const newCalc = await CalculatorService.create(db, body);

		return c.json({
			data: newCalc,
			message: CALCULATOR_CODES.CREATE.SUCCESS,
		});
	},
);

export const getCalculatorById = createHandlers(
	zValidator("param", itemIdSchema),
	db,
	async (c) => {
		const { id: calcId } = c.req.valid("param");
		const db = c.get("db");

		const foundCalc = await CalculatorService.getById(db, calcId);
		const calculator = JSON.parse(foundCalc.text);

		return c.json({ data: calculator });
	},
);

export const deleteCalculatorById = createHandlers(
	zValidator("param", itemIdSchema),
	db,
	async (c) => {
		const { id: calcId } = c.req.valid("param");
		const db = c.get("db");

		const foundCalc = await CalculatorService.delete(db, calcId);

		if (foundCalc.rowsAffected === 0) {
			return CalculatorErrors.NotFound();
		}

		return c.json({
			message: CALCULATOR_CODES.DELETE.SUCCESS,
		});
	},
);
