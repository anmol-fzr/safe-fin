import { zValidator } from "@hono/zod-validator";
import { calculator, getDb } from "@safe-fin/db";
import { count, eq } from "drizzle-orm";
import { getPaginateRes, paginate } from "@/middleware";
import { createTypedFactory } from "../../factory";
import { calculatorMetadataSchema } from "./schema";
import { queryParamSchema } from "@/schema/params";

const { createApp } = createTypedFactory();

const calculatorRouter = createApp()
	.get("/", zValidator("query", queryParamSchema), paginate, async (c) => {
		const { limit, page } = c.get("paginate");

		const offset = (page - 1) * limit;

		const db = getDb(c.env);
		const query = db.select().from(calculator).limit(limit).offset(offset);

		const countPrms = db.select({ count: count() }).from(calculator);

		const [countVal, calcs] = await Promise.all([countPrms, query]);

		const calculators = calcs.map((calc) => {
			return {
				id: calc.id,
				...JSON.parse(calc.text),
			};
		});

		const total = countVal[0].count;

		return c.json({
			data: calculators,
			paginate: getPaginateRes({ total, offset, limit }),
		});
	})
	.post("/", zValidator("json", calculatorMetadataSchema), async (c) => {
		const body = c.req.valid("json");

		const db = getDb(c.env);
		const [newCalc] = await db
			.insert(calculator)
			.values({ text: JSON.stringify(body) })
			.returning();

		return c.json({
			data: newCalc,
			message: "New Calculator Added Successfully",
		});
	})
	.get("/:id", async (c) => {
		const db = getDb(c.env);
		const calcId = c.req.param("id");

		const [foundCalc] = await db
			.select()
			.from(calculator)
			.where(eq(calculator.id, calcId))
			.limit(1);

		return c.json({ data: JSON.parse(foundCalc.text) });
	})
	.delete("/:id", async (c) => {
		const db = getDb(c.env);
		const calcId = c.req.param("id");
		const foundCalc = await db
			.delete(calculator)
			.where(eq(calculator.id, calcId));

		if (foundCalc.rowsAffected === 0) {
			return c.json(
				{
					error: "Calculator Not Found",
					message: "Calculator Not Found",
				},
				404,
			);
		}

		return c.json({
			message: "Calculator Deleted Successfully",
		});
	});

export { calculatorRouter };
