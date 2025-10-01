import { createFactory } from "hono/factory";
import type { HonoAppProps } from "../../index.ts";

const factory = createFactory<HonoAppProps>();

const getCalculatorConfig = factory.createHandlers(async (c) => {
	return c.json({
		SIP: {
			list: {
				title: "SIP",
				desc: "Calculate how much you need to save or how much you will accumulate with your SIP",
				screen: "SIP",
			},
			title: "SIP Calculator",
			sliders: [
				{
					label: "Monthly Investment",
					key: "investment",
					value: 25000,
					step: 100,
					minValue: 100,
					maxValue: 1000000,
				},
				{
					label: "Expected Return Rate (p.a)",
					key: "rate",
					value: 12,
					step: 0.1,
					minValue: 1,
					maxValue: 30,
				},
				{
					label: "Time Period (in Years)",
					key: "duration",
					value: 10,
					step: 1,
					minValue: 1,
					maxValue: 40,
				},
			],
			resultKeys: [
				["totalInvested", "Total Invested"],
				["returns", "Returns"],
				["totalValue", "Total Value"],
			],
			pieChart: true,
			calculate: {
				totalValue:
					"investment * (((1 + rate/1200) ^ (duration*12) - 1) / (rate/1200)) * (1 + rate/1200)",
				totalInvested: "investment * duration * 12",
				returns: "totalValue - totalInvested",
			},
		},
	});
});

export { getCalculatorConfig };
