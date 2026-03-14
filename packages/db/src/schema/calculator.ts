import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "./__utils";

const calculator = sqliteTable("calculator", {
	id,
	title: text().notNull(),
	desc: text().notNull(),
	calculator: text({ mode: "json" })
		.$type<{
			sliders: {
				label: string;
				key: string;
				value: number;
				step: number;
				minValue: number;
				maxValue: number;
				prepend?: string;
				append?: string;
			}[];
			calculate: Record<string, string>;
			resultKeys: Record<string, string>;
			pieChart: boolean;
			pieData: {
				valueKey: string;
				text: string;
			}[];
		}>()
		.notNull(),
});

export type InsertCalculator = typeof calculator.$inferInsert;

export { calculator };
