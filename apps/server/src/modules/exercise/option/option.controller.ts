import { createTypedFactory } from "@/factory";
import { zValidator } from "@hono/zod-validator";
import { OptionService } from "./option.service";
import { createOptionSchema } from "./option.schema";
import { OPTION_CODES } from "./option.codes";

const { createHandlers } = createTypedFactory();

const service = new OptionService();

export const createOption = createHandlers(
	zValidator("json", createOptionSchema),
	async (c) => {
		const body = c.req.valid("json");

		const result = await service.create(body);

		return result.match(
			(result) => {
				return c.json({
					data: result.data,
					message: OPTION_CODES.CREATE.SUCCESS,
				});
			},
			(error) => {
				console.log(error);

				return c.json({
					data: null,
					message: OPTION_CODES.CREATE.ERROR,
				});
			},
		);
	},
);
