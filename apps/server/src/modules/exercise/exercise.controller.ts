import { createTypedFactory } from "@/factory";
import { authenticate, paginate, userRole } from "@/middleware";
import { queryParamSchema } from "@/schema/params";
import { zValidator } from "@hono/zod-validator";
import { ExerciseService } from "./exercise.service";
import { createExerciseSchema, exerciseIdParamSchema } from "./exercise.schema";
import { EXERCISE_CODES as CODES } from "./exercise.codes";
import { Reason } from "../_utils/reasons";

const { createHandlers } = createTypedFactory();

const service = new ExerciseService();

export const getExercises = createHandlers(
	authenticate,
	userRole("admin"),
	zValidator("query", queryParamSchema),
	paginate,
	async (c) => {
		const { limit, offset, searchValue } = c.get("paginate");

		const result = await service.get({ limit, offset, search: searchValue });

		return result.match(
			(result) => {
				return c.json({
					data: result.data,
					paginate: result.paginate,
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

export const createExercise = createHandlers(
	authenticate,
	userRole("admin"),
	zValidator("json", createExerciseSchema),
	async (c) => {
		const body = c.req.valid("json");

		const result = await service.create(body);

		return result.match(
			(exercises) => {
				return c.json({
					data: exercises.data,
				});
			},
			(error) => {
				console.log(error);

				return c.json({
					data: null,
					message: "Something Went Wrong",
				});
			},
		);
	},
);

export const getExerciseById = createHandlers(
	zValidator("param", exerciseIdParamSchema),
	async (c) => {
		const { exerciseId } = c.req.valid("param");

		const result = await service.getById(exerciseId);

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

					case Reason.NotFound: {
						return c.json({
							data: null,
							message: CODES.NOT_FOUND,
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

export const updateExerciseById = createHandlers(
	authenticate,
	userRole("admin"),
	zValidator("param", exerciseIdParamSchema),
	async (c) => {
		const { exerciseId } = c.req.valid("param");

		const result = await service.getById(exerciseId);

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

					case Reason.NotFound: {
						return c.json({
							data: null,
							message: CODES.NOT_FOUND,
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
