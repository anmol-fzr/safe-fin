import { z } from "zod";

const email = z.email({
	error: "Email is Required",
});

const name = z.string({
	error: "Name is Required",
});

const loginSchema = z.object({
	email,
});

const registerSchema = z.object({
	name,
	email,
});

const profileSchema = z.object({
	name,
	email,
	image: z.string(),
	bio: z.string({ error: "Bio is Required" }),
});

export { loginSchema, registerSchema, profileSchema };
