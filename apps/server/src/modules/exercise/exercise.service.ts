import { exercise, getDb, sql, count } from "@/pkg/db";
import {
	ResourceService,
	type PaginatePayload,
	type ResourceId,
} from "@/modules/_utils/service";
import { errAsync, okAsync, Result } from "neverthrow";
import { getPaginateRes, paginate } from "@/middleware";
import { isUndefined } from "@safe-fin/utils";
import { Reason } from "../_utils/reasons";

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
		const { offset, limit } = paginatePayload;

		try {
			const query = exercisePaginated.all({
				limit,
				offset,
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

	async getById(exerciseId: ResourceId) {
		try {
			const foundExercise = await db.query.exercise.findFirst({
				where: (exercises, { eq }) => eq(exercises.id, exerciseId),
				with: {
					questions: {
						with: {
							options: true,
						},
					},
				},
			});

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
