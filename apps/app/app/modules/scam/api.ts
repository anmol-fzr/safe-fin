import { scams } from "@/utils/const";

export type Scam = {
	id: number;
	title: string;
	desc: string;
	tags: string[];
};
export type Scams = Scam[];

export const SCAM = {
	ALL: (): Promise<Scams> => new Promise((resolve) => resolve(scams)),
	ONE: (scamId: number): Promise<Scam | undefined> => {
		return new Promise((resolve) => {
			const foundScam = scams.find((scam) => scam.id === scamId);
			resolve(foundScam);
		});
	},
} as const;
