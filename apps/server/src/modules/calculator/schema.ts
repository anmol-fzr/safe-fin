import { z } from "zod";

const slider = z.object({
	label: z.string(),
	key: z.string(),
	value: z.number(),
	step: z.number(),
	minValue: z.number(),
	maxValue: z.number(),
});

const calculatorMetadataSchema = z.object({
	list: z.object({
		title: z
			.string()
			.describe("Title of the Calculator for List View. e.g - SIP"),
		desc: z
			.string()
			.describe(
				"Description of the Calculator. e.g - Systematic Investment Plan",
			),
		screen: z
			.string()
			.describe("Screen Key of the Uniquely Indentify Calculator. e.g - SIP"),
	}),
	title: z
		.string()
		.describe("Title of the Calculator for Main View. e.g - SIP"),
	sliders: z
		.array(slider)
		.describe(
			"Input Sliders for the Calculator for Main View. e.g - Rate, Years",
		),
	resultKeys: z.record(z.string(), z.string()),
	pieChart: z
		.boolean()
		.describe("Whether to Show Pie Chart or not. e.g - true | false"),
	calculate: z
		.object({
			totalValue: z.string(),
			totalInvested: z.string(),
			returns: z.string(),
		})
		.describe(
			"Object having math expression as value to Calculate. e.g - a * b",
		),
});

export { calculatorMetadataSchema };
