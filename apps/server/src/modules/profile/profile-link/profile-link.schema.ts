import { z } from "zod";

export const addUserProfileLinkSchema = z.object({
	link: z.string(),
	//link: z.string().url(),
});

// export const addUserProfileLinkSchema = z.union([
// 	z.object({
// 		link: z.string().url(),
// 	}),
// 	z.object({
// 		links: z.array(z.string().url()),
// 	}),
// ]);
