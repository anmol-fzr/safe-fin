import { z } from "zod";
import { paginateSchema } from "./utils";

const calculators = z.array(
	z.union([
		z.object({
			id: z.number(),
			title: z.string(),
			list: z.object({
				title: z.string(),
				desc: z.string(),
				screen: z.string(),
			}),
			sliders: z.array(
				z.object({
					label: z.string(),
					key: z.string(),
					append: z.string(),
					value: z.number(),
					step: z.number(),
					minValue: z.number(),
					maxValue: z.number(),
				}),
			),
			resultKeys: z.object({
				totalInvested: z.string(),
				returns: z.string(),
				totalValue: z.string(),
			}),
			pieChart: z.boolean(),
			pieData: z.array(z.object({ valueKey: z.string(), text: z.string() })),
			calculate: z.object({
				totalValue: z.string(),
				totalInvested: z.string(),
				returns: z.string(),
				investedAmtGraph: z.string(),
				estReturnsGraph: z.string(),
			}),
		}),
		z.object({
			id: z.number(),
			title: z.string(),
			list: z.object({
				title: z.string(),
				desc: z.string(),
				screen: z.string(),
			}),
			sliders: z.array(
				z.union([
					z.object({
						label: z.string(),
						key: z.string(),
						prepend: z.string(),
						value: z.number(),
						step: z.number(),
						minValue: z.number(),
						maxValue: z.number(),
					}),
					z.object({
						label: z.string(),
						key: z.string(),
						append: z.string(),
						value: z.number(),
						step: z.number(),
						minValue: z.number(),
						maxValue: z.number(),
					}),
				]),
			),
			resultKeys: z.object({
				totalInvestment: z.string(),
				totalWithDrawl: z.string(),
				finalValue: z.string(),
			}),
			pieChart: z.boolean(),
			calculate: z.object({
				totalInvestment: z.string(),
				i: z.string(),
				n: z.string(),
				finalValue: z.string(),
				totalWithDrawl: z.string(),
			}),
		}),
		z.object({
			id: z.number(),
			title: z.string(),
			list: z.object({
				title: z.string(),
				desc: z.string(),
				screen: z.string(),
			}),
			sliders: z.array(
				z.union([
					z.object({
						label: z.string(),
						key: z.string(),
						prepend: z.string(),
						value: z.number(),
						step: z.number(),
						minValue: z.number(),
						maxValue: z.number(),
					}),
					z.object({
						label: z.string(),
						key: z.string(),
						append: z.string(),
						value: z.number(),
						step: z.number(),
						minValue: z.number(),
						maxValue: z.number(),
					}),
					z.object({
						label: z.string(),
						key: z.string(),
						append: z.string(),
						value: z.number(),
						step: z.number(),
						minValue: z.number(),
						maxValue: z.number(),
						disabled: z.boolean(),
					}),
				]),
			),
			resultKeys: z.object({
				totalInvestment: z.string(),
				maturityValue: z.string(),
				interestEarned: z.string(),
			}),
			pieChart: z.boolean(),
			pieData: z.array(z.object({ valueKey: z.string(), text: z.string() })),
			calculate: z.object({
				r: z.string(),
				n: z.string(),
				someValue: z.string(),
				totalInvestment: z.string(),
				maturityValue: z.string(),
				interestEarned: z.string(),
				totalInvestmentGraph: z.string(),
				totalInterestGraph: z.string(),
			}),
		}),
	]),
);

const calculatorsResSchema = z.object({
	data: calculators,
	paginate: paginateSchema,
});

export { calculatorsResSchema };
