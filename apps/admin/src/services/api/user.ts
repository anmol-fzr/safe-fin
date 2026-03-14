import { axiosInstance as ax } from "./axios";
import type { IResData } from "./types";

const { get } = ax;

export const USER: ApiUsers = {
	GET: () => get(`/api/auth/admin/list-users`),
} as const;

// type ILessonsRes = IResData<ILesson[]>;
// type ILessonRes = IResData<ILesson>;
//
// export type ICreateLessonReq = Pick<
// 	ILesson,
// 	"title" | "desc" | "content" | "contentJson" | "isPublished"
// >;
//
type ApiUsers = {
	GET: () => Promise<IResUsers>;
	// ONE: (id: ResourceId) => Promise<ILessonRes>;
	// CREATE: (lesson: ICreateLessonReq) => Promise<ILessonRes>;
	// DELETE: (lesson: ResourceId) => Promise<ILessonRes>;
	// UPDATE: (id: ResourceId, lesson: ICreateLessonReq) => Promise<ILessonRes>;
};

interface IUser {
	name: string;
	email: string;
	emailVerified: boolean;
	image: any;
	createdAt: string;
	updatedAt: string;
	role: string;
	banned: any;
	banReason: any;
	banExpires: any;
	phoneNumber: string;
	phoneNumberVerified: boolean;
	id: string;
}

type IUsers = IUser[];
type IResUsers = {
	users: IUsers;
	total: number;
};

export type { IUser, IUsers };
