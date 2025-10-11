import { zValidator } from "@hono/zod-validator";
import { calculator, getDb } from "@safe-fin/db";
import { eq } from "drizzle-orm";
import { createTypedFactory } from "../../factory";
import { calculatorMetadataSchema } from "./schema";

const { createApp } = createTypedFactory();

const calculatorRouter = createApp()
	.get("/", async (c) => {
		const db = getDb(c.env);
		const query = await db.select().from(calculator);
		const calcs = query.map((calc) => {
			return {
				id: calc.id,
				...JSON.parse(calc.text),
			};
		});

		return c.json({ data: calcs });
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
