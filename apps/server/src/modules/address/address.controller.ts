import { zValidator } from "@hono/zod-validator";
import { createTypedFactory } from "@/factory";
import {
	getCitiesByStateAndCountrySchema,
	getStateByCountrySchema,
} from "./address.schema";
import {
	getAllCountries,
	getCitiesOfState,
	getStateByCountryCode,
} from "./address.service";

const { createHandlers } = createTypedFactory();

export const getCountries = createHandlers(async (c) => {
	const data = getAllCountries();
	const countries = data.map((country) => {
		return { name: country.name, isoCode: country.isoCode };
	});

	return c.json({
		data: countries,
	});
});

export const getStatesByCountry = createHandlers(
	zValidator("param", getStateByCountrySchema),
	async (c) => {
		const { country_code: countryCode } = c.req.valid("param");

		const rawStates = getStateByCountryCode(countryCode);

		const states = rawStates.map((state) => {
			return {
				name: state.name,
				isoCode: state.isoCode,
				countryCode: state.countryCode,
			};
		});

		return c.json({ data: states });
	},
);

export const getCitiesByState = createHandlers(
	zValidator("param", getCitiesByStateAndCountrySchema),
	async (c) => {
		const { country_code: countryCode, state_code: stateCode } =
			c.req.valid("param");

		const rawCities = getCitiesOfState(countryCode, stateCode);
		const cities = rawCities.map((city) => {
			return {
				name: city.name,
				stateCode: city.stateCode,
				countryCode: city.countryCode,
			};
		});

		return c.json({ data: cities });
	},
);
