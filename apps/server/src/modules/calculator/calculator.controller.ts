import { zValidator } from "@hono/zod-validator";
import { db, getPaginateRes, paginate } from "@/middleware";
import { itemIdSchema, queryParamSchema } from "@/schema/params";
import { createTypedFactory } from "../../factory";
import { CALCULATOR_CODES, CalculatorErrors } from "./calculator.codes";
import { calculatorMetadataSchema } from "./calculator.schema";
import { CalculatorService } from "./calculator.service";

const { createHandlers } = createTypedFactory();

const CALCS = [
	{
		id: 1,
		title: "SIP Calculator",
		list: {
			title: "SIP Calculator",
			desc: "Calculate returns on your monthly mutual fund investments.",
			screen: "CalculatorScreen",
		},
		sliders: [
			{
				label: "Monthly Investment",
				key: "monthlyInvestment",
				value: 5000,
				step: 500,
				minValue: 500,
				maxValue: 100000,
				prepend: "₹",
			},
			{
				label: "Expected Return Rate (p.a)",
				key: "expectedReturnRate",
				value: 12,
				step: 0.5,
				minValue: 1,
				maxValue: 30,
				append: "%",
			},
			{
				label: "Time Period",
				key: "timePeriod",
				value: 5,
				step: 1,
				minValue: 1,
				maxValue: 30,
				append: " Yr",
			},
		],
		calculate: {
			monthlyRate: "expectedReturnRate / 12 / 100",
			months: "timePeriod * 12",
			totalAmount:
				"monthlyInvestment * (((1 + monthlyRate) ^ months - 1) / monthlyRate) * (1 + monthlyRate)",
			investedAmount: "monthlyInvestment * months",
			estReturns: "totalAmount - investedAmount",
		},
		resultKeys: {
			investedAmount: "Invested Amount",
			estReturns: "Est. Returns",
			totalAmount: "Total Value",
		},
		pieChart: true,
		pieData: [
			{
				valueKey: "investedAmount",
				text: "Invested Amount",
			},
			{
				valueKey: "estReturns",
				text: "Est. Returns",
			},
		],
	},
	{
		id: 2,
		title: "Lumpsum Calculator",
		list: {
			title: "Lumpsum Calculator",
			desc: "Calculate returns on your one-time mutual fund investments.",
			screen: "CalculatorScreen",
		},
		sliders: [
			{
				label: "Total Investment",
				key: "investment",
				value: 25000,
				step: 500,
				minValue: 500,
				maxValue: 1000000,
				prepend: "₹",
			},
			{
				label: "Expected Return Rate (p.a)",
				key: "expectedReturnRate",
				value: 12,
				step: 0.5,
				minValue: 1,
				maxValue: 30,
				append: "%",
			},
			{
				label: "Time Period",
				key: "timePeriod",
				value: 5,
				step: 1,
				minValue: 1,
				maxValue: 30,
				append: " Yr",
			},
		],
		calculate: {
			totalAmount: "investment * (1 + expectedReturnRate / 100) ^ timePeriod",
			investedAmount: "investment * 1",
			estReturns: "totalAmount - investedAmount",
		},
		resultKeys: {
			investedAmount: "Invested Amount",
			estReturns: "Est. Returns",
			totalAmount: "Total Value",
		},
		pieChart: true,
		pieData: [
			{
				valueKey: "investedAmount",
				text: "Invested Amount",
			},
			{
				valueKey: "estReturns",
				text: "Est. Returns",
			},
		],
	},
];

export const getCalculators = createHandlers(
	zValidator("query", queryParamSchema),
	paginate,
	db,
	async (c) => {
		const { limit, offset } = c.get("paginate");
		//const db = c.get("db");

		// const { calculators, total } = await CalculatorService.getAll(
		// 	db,
		// 	limit,
		// 	offset,
		// );

		// const formatted = calculators.map((calc) => ({
		// 	id: calc.id,
		// 	...JSON.parse(calc.text),
		// }));

		return c.json({
			data: CALCS,
			paginate: getPaginateRes({ total: CALCS.length, offset, limit }),
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
		//const db = c.get("db");

		// const foundCalc = await CalculatorService.getById(db, calcId);
		// const calculator = JSON.parse(foundCalc.text);

		const foundCalc = CALCS.find((calc) => calc.id === calcId);

		if (!foundCalc) {
			return c.json({ data: null }, 404);
		}

		return c.json({ data: foundCalc });
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
