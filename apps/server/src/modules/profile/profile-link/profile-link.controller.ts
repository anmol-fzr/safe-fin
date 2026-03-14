import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { createTypedFactory } from "@/factory";
import { authenticate } from "@/middleware";
import { Reason } from "@/modules/_utils/reasons";
import { getDb } from "@/pkg/db";
import { idParamSchema } from "@/schema";
import { addUserProfileLinkSchema } from "./profile-link.schema";
import { ProfileLinkService } from "./profile-link.service";

const { createHandlers } = createTypedFactory();

const service = new ProfileLinkService();

export const addUserProfileLinkHndlr = createHandlers(
	authenticate,
	zValidator("json", addUserProfileLinkSchema),
	async (c) => {
		const data = c.req.valid("json");
		const { id: userId } = c.get("user");

		const result = await service.create({
			userId,
			link: data.link,
		});

		return result.match(
			(result) => {
				return c.json({
					data: result.data,
				});
			},
			(error) => {
				console.log(error);

				switch (error.reason) {
					case Reason.UnExpected: {
						return c.json({
							data: null,
							message: "Something Went Wrong",
						});
					}

					default: {
						console.log(error.reason satisfies never);
						return c.json({
							data: null,
							message: "Something Went Wrong",
						});
					}
				}
			},
		);
	},
);

export const deleteUserProfileLinkHndlr = createHandlers(
	authenticate,
	zValidator(
		"param",
		z.object({
			id: idParamSchema,
		}),
	),
	async (c) => {
		const { id } = c.req.valid("param");
		const user = c.get("user");

		const result = await service.deleteById(id, user);

		return result.match(
			() => {
				return c.json({
					success: true,
				});
			},
			(error) => {
				console.log(error);

				switch (error.reason) {
					case Reason.UnExpected: {
						return c.json({
							data: null,
							message: "Something Went Wrong",
						});
					}

					default: {
						console.log(error.reason satisfies never);
						return c.json({
							data: null,
							message: "Something Went Wrong",
						});
					}
				}
			},
		);
	},
);
