import { object, string, number, type InferType } from "yup";

export const addUserSchema = object({
	name: string().required(),
	email: string().email().required(),
	password: string().required(),
	phoneNumber: number().required(),
	role: string().oneOf(["admin", "user"]).default("user"),
});

export type AddUserFormData = InferType<typeof addUserSchema>;
