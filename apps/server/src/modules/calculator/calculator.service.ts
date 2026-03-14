import { calculator, count, type DB, eq } from "@/pkg/db";

export class CalculatorService {
	static async getAll(db: DB, limit: number, offset: number) {
		const query = db.select().from(calculator).limit(limit).offset(offset);
		const countQuery = this.getCount(db);

		const [queryResult, countResult] = await Promise.all([query, countQuery]);

		return {
			calculators: queryResult,
			total: countResult?.[0]?.count ?? 0,
		};
	}

	static async create(db: DB, body: any) {
		const [newCalc] = await db
			.insert(calculator)
			.values({ text: JSON.stringify(body) })
			.returning();
		return newCalc;
	}

	static async getById(db: DB, id: number) {
		const foundCalculator = db.query.calculator.findFirst({
			where: eq(calculator.id, id),
		});

		return foundCalculator;
	}

	static async delete(db: DB, id: number) {
		return await db.delete(calculator).where(eq(calculator.id, id));
	}

	static getCount(db: DB) {
		return db.select({ count: count() }).from(calculator);
	}
}
