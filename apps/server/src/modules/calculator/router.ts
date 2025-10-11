import { zValidator } from "@hono/zod-validator";
import { createTypedFactory } from "../../factory";
import { createCalculatorMetadata, getCalculatorConfig } from "./controller";
import { calculatorMetadataSchema } from "./schema";

const { createApp, createHandlers } = createTypedFactory();

const createCalculatorMetadata = createHandlers(
	zValidator("json", calculatorMetadataSchema),
	async (c) => {
		const body = c.req.valid("json");

		return c.json(body);
	},
);

const calcs = [
	{
		id: 1,
		title: "SIP Calculator",
		list: {
			title: "SIP",
			desc: "Calculate how much you need to save or how much you will accumulate with your SIP",
			screen: "SIP",
		},
		sliders: [
			{
				label: "Monthly Investment",
				key: "investment",
				append: "₹",
				value: 25000,
				step: 100,
				minValue: 100,
				maxValue: 1000000,
			},
			{
				label: "Expected Return Rate (p.a)",
				key: "rate",
				append: "%",
				value: 12,
				step: 0.1,
				minValue: 1,
				maxValue: 30,
			},
			{
				label: "Time Period (in Years)",
				key: "duration",
				append: "Yr",
				value: 10,
				step: 1,
				minValue: 1,
				maxValue: 40,
			},
		],
		resultKeys: {
			totalInvested: "Total Invested",
			returns: "Returns",
			totalValue: "Total Value",
		},
		pieChart: true,
		pieData: [
			{
				valueKey: "investedAmtGraph",
				text: "Invested amount",
			},
			{
				valueKey: "estReturnsGraph",
				text: "Estimated returns",
			},
		],
		calculate: {
			totalValue:
				"investment * (((1 + rate/1200) ^ (duration*12) - 1) / (rate/1200)) * (1 + rate/1200)",
			totalInvested: "investment * duration * 12",
			returns:
				"(investment * (((1 + rate/1200) ^ (duration*12) - 1) / (rate/1200)) * (1 + rate/1200)) - (investment * duration * 12)",

			investedAmtGraph: "totalInvested / totalValue",
			estReturnsGraph: "returns / totalValue",
		},
	},
	{
		id: 2,
		title: "SWP Calculator",
		list: {
			title: "SWP",
			desc: "Calculate your final amount with Systematic Withdrawl Plan (SWP)",
			screen: "SWP",
		},
		sliders: [
			{
				label: "Total Investment",
				key: "totalInvestment",
				prepend: "₹",
				value: 5_00_000,
				step: 10_000,
				minValue: 10_000,
				maxValue: 10_000_000,
			},
			{
				label: "Withdrawl per month",
				key: "withdrawl",
				prepend: "₹",
				value: 10_000,
				step: 500,
				minValue: 500,
				maxValue: 10_00_000,
			},
			{
				label: "Expected Return rate (p.a)",
				key: "rate",
				append: "%",
				value: 8,
				step: 0.1,
				minValue: 1,
				maxValue: 30,
			},
			{
				label: "Time Period",
				key: "duration",
				append: "Yr",
				value: 5,
				step: 1,
				minValue: 1,
				maxValue: 30,
			},
		],
		resultKeys: {
			totalInvestment: "Total Investment",
			totalWithDrawl: "Total Withdrawl",
			finalValue: "Final Value",
		},
		pieChart: true,
		calculate: {
			totalInvestment: "totalInvestment",
			i: "rate / 12 / 100",
			n: "duration * 12",
			finalValue:
				"totalInvestment * (1 + i) ^ n - withdrawl * (((1 + i) ^ n - 1) / i)",
			totalWithDrawl: "finalValue - totalInvestment",
		},
	},
	{
		id: 3,
		title: "PPF",
		list: {
			title: "PPF",
			desc: "Calculate your returns on Public Provident Fund (PPF)",
			screen: "PPF",
		},
		sliders: [
			{
				label: "Yearly Investment",
				key: "yearlyInvestment",
				prepend: "₹",
				value: 10_000,
				step: 500,
				minValue: 500,
				maxValue: 1_50_000,
			},
			{
				label: "Time Period",
				key: "duration",
				append: "Yr",
				value: 15,
				step: 1,
				minValue: 15,
				maxValue: 50,
			},
			{
				label: "Expected Return rate (p.a)",
				key: "rate",
				append: "%",
				value: 7.1,
				disabled: true,
				step: 0,
				minValue: 7.1,
				maxValue: 7.1,
			},
		],
		resultKeys: {
			totalInvestment: "Total Investment",
			maturityValue: "Maturity Value",
			interestEarned: "Interest Earned",
		},
		pieChart: true,
		pieData: [
			{
				valueKey: "totalInvestmentGraph",
				text: "Total Investment",
			},
			{
				valueKey: "totalInterestGraph",
				text: "Total interest",
			},
		],
		calculate: {
			r: "rate / 100",
			n: "duration",
			someValue: "( ( (1 + r) ^ n) - 1) / r",

			totalInvestment: "yearlyInvestment * n",
			maturityValue: "yearlyInvestment * someValue",
			interestEarned: "maturityValue - totalInvestment",

			totalInvestmentGraph: "totalInvestment / maturityValue",
			totalInterestGraph: "interestEarned / maturityValue",
		},
	},
];

const getCalculatorConfig = createHandlers(async (c) => {
	return c.json(calcs);
});

const getCalculatorConfigById = createHandlers(async (c) => {
	return c.json(calcs);
});

export { getCalculatorConfig, createCalculatorMetadata };

const calculatorRouter = createApp()
	.get("/", (c) => {
		return c.json({ data: calcs });
	})
	.get("/:id", (c) => {
		const calcId = c.req.param("id");
		const foundCalc = calcs.find((calc) => {
			return calc.id.toString() === calcId;
		});

		return c.json({ data: foundCalc });
	})
	.post(...createCalculatorMetadata);

export { calculatorRouter };
