import { calculator, count, type DB, eq } from "@/pkg/db";

export const CalculatorService = {
	getAll: async (db: DB, limit: number, offset: number) => {
		const query = db.select().from(calculator).limit(limit).offset(offset);
		const countPrms = db.select({ count: count() }).from(calculator);

		const [resultCount, calcs] = await Promise.all([countPrms, query]);

		return {
			calculators: calcs,
			total: resultCount[0].count,
		};
	},

	create: async (db: DB, body: any) => {
		const [newCalc] = await db
			.insert(calculator)
			.values({ text: JSON.stringify(body) })
			.returning();
		return newCalc;
	},

	getById: async (db: DB, id: number) => {
		const [foundCalc] = await db
			.select()
			.from(calculator)
			.where(eq(calculator.id, id))
			.limit(1);

		return foundCalc;
	},

	delete: async (db: DB, id: number) => {
		return await db.delete(calculator).where(eq(calculator.id, id));
	},
};
