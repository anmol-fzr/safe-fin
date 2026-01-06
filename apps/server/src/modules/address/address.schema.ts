import { z } from "zod";

export const getStateByCountrySchema = z.object({
	country_code: z.string().describe("ISO Code of Country"),
});

export const getCitiesByStateAndCountrySchema = getStateByCountrySchema.extend({
	state_code: z.string().describe("ISO Code of the State of the Country"),
});
