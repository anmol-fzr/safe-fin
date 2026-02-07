import { question, getDb } from "@/pkg/db";
import { ResourceService } from "@/modules/_utils/service";
import { errAsync, okAsync } from "neverthrow";
import { Reason } from "@/modules/_utils/reasons";

const db = getDb();

interface CreateQuestionPayload {
	exerciseId: number;
	question: string;
	reason: string;
	isPublished: boolean;
}

export class QuestionService extends ResourceService {
	async create(payload: CreateQuestionPayload) {
		try {
			const result = await db.insert(question).values(payload).returning();

			if (result.length === 0) {
				console.info("No Rows Inserted");
				return errAsync({
					reason: Reason.UnExpected,
				} as const);
			}

			return okAsync({
				data: result[0],
			} as const);
		} catch (error) {
			return errAsync({
				reason: Reason.UnExpected,
				error: error,
			} as const);
		}
	}
}
