import { scams } from "@/utils/const";

export type Scams = typeof scams;
export type Scam = Scams[number];

export const SCAM = {
	GET: (): Promise<Scams> => new Promise((resolve) => resolve(scams)),
	ONE: (scamId: number): Promise<Scam | undefined> => {
		return new Promise((resolve) => {
			const foundScam = scams.find((scam) => scam.id === scamId);
			console.log({ foundScam });
			resolve(foundScam);
		});
	},
} as const;
