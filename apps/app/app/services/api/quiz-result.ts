import { axiosInstance, IResData } from "../axios";

interface SaveQuizResultReq {
	quizId: number;
	result: IQuizResult[];
}

interface IQuizResult {
	questionId: number;
	answeredId: number;
}

type ISaveQuizResultRes = IResData<{
	quizId: number;
	id: number;
	userId: string;
}>;

export const RESULT = {
	SAVE: (data: SaveQuizResultReq) =>
		axiosInstance.post<never, ISaveQuizResultRes, SaveQuizResultReq>(
			"/quiz/result",
			data,
		),
};

export type { IQuizResult };
