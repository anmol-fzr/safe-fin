import { exercise, getDb, sql, count, eq, and } from "@/pkg/db";
import {
	ResourceService,
	type PaginatePayload,
	type ResourceId,
} from "@/modules/_utils/service";
import { errAsync, okAsync, Result } from "neverthrow";
import { getPaginateRes, paginate } from "@/middleware";
import { isUndefined } from "@safe-fin/utils";
import { Reason } from "../_utils/reasons";
import type { User } from "@/pkg/auth";

const db = getDb();

const exercisePaginated = db.query.exercise
	.findMany({
		limit: sql.placeholder("limit"),
		offset: sql.placeholder("offset"),
		with: {
			chapter: {
				columns: { title: true },
			},
		},
	})
	.prepare();

const countExercises = db.select({ count: count() }).from(exercise).prepare();

interface CreateExercisePayload {
	title: string;
	desc: string;
	isPublished: boolean;
	chapterId: number;
}

type UpdateExercisePayload = Partial<CreateExercisePayload>;

export class ExerciseService extends ResourceService {
	async create(payload: CreateExercisePayload) {
		try {
			const result = await db.insert(exercise).values(payload).returning();

			if (result.length === 0) {
				console.info("No Rows Inserted");
				return errAsync({
					reason: "Unexpected",
				} as const);
			}

			return okAsync({
				data: result[0],
				message: "Exercise Created Successfully",
			} as const);
		} catch (error) {
			return errAsync({
				reason: "Unexpected",
				error: error,
			} as const);
		}
	}
	async get(paginatePayload: PaginatePayload) {
		const { offset, limit, search } = paginatePayload;

		try {
			const query = db.query.exercise.findMany({
				limit,
				offset,
				where: search
					? (exercises, { like }) => like(exercises.title, `%${search}%`)
					: undefined,
				with: {
					chapter: {
						columns: { title: true },
					},
				},
			});

			const countQuery = countExercises.run();

			const [queryResult, countResult] = await Promise.all([query, countQuery]);

			const total = countResult?.[0]?.count ?? 0;

			return okAsync({
				data: queryResult,
				paginate: getPaginateRes({ limit, offset, total }),
			} as const);
		} catch (error) {
			return errAsync({
				reason: Reason.UnExpected,
				error: error,
			} as const);
		}
	}

	async getById(exerciseId: ResourceId, user: User) {
		const isAdmin = user.role === "admin";
		const isUser = user.role === "user";

		try {
			const filters = [];

			if (isAdmin) {
				filters.push(eq(exercise.isPublished, true));
			}

			const foundExerciseQuery = db.query.exercise.findFirst({
				where: and(...filters, eq(exercise.id, exerciseId)),
				columns: {
					coverPath: false,
					chapterId: isAdmin,
					isPublished: isAdmin,
					createdAt: isAdmin,
					updatedAt: isAdmin,
				},
				with: {
					chapter: {
						columns: {},
						with: {
							course: {
								columns: {},
								with: {
									content: {
										columns: { title: true },
									},
								},
							},
						},
					},

					questions: {
						where: isUser ? eq(exercise.isPublished, true) : undefined,
						columns: {
							isPublished: isAdmin,
							exerciseId: isAdmin,
							index: isAdmin,
							answerId: isAdmin,
							createdAt: isAdmin,
							updatedAt: isAdmin,
						},
						orderBy: (question, { asc }) => asc(question.index),
						with: {
							options: {
								columns: {
									index: isAdmin,
									questionId: isAdmin,
									createdAt: isAdmin,
									updatedAt: isAdmin,
								},
								orderBy: (question, { asc }) => asc(question.index),
							},
							answer: {
								columns: isUser
									? {
											id: true,
											value: true,
										}
									: undefined,
							},
						},
					},
				},
			});

			const foundExercise = await foundExerciseQuery;

			if (isUndefined(foundExercise)) {
				return errAsync({
					reason: Reason.NotFound,
					error: null,
				} as const);
			}

			return okAsync({
				data: foundExercise,
			} as const);
		} catch (error) {
			return errAsync({
				reason: Reason.UnExpected,
				error: error,
			} as const);
		}
	}

	async updateById(exerciseId: ResourceId, payload: UpdateExercisePayload) {
		try {
			const updatedExercise = await db
				.update(exercise)
				.set(payload)
				.where(eq(exercise.id, exerciseId));

			if (updatedExercise.rowsAffected === 0) {
				return errAsync({
					reason: Reason.NotFound,
					error: null,
				} as const);
			}

			return okAsync({
				data: updatedExercise,
			} as const);
		} catch (error) {
			return errAsync({
				reason: Reason.UnExpected,
				error: error,
			} as const);
		}
	}

	async deleteById(exerciseId: ResourceId) {
		try {
			const foundExercise = await db
				.delete(exercise)
				.where(eq(exercise.id, exerciseId));

			if (isUndefined(foundExercise)) {
				return errAsync({
					reason: Reason.NotFound,
					error: null,
				} as const);
			}

			return okAsync({
				data: foundExercise,
			} as const);
		} catch (error) {
			return errAsync({
				reason: Reason.UnExpected,
				error: error,
			} as const);
		}
	}
}
