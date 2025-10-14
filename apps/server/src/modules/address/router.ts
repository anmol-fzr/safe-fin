import { City, Country, State } from "country-state-city";
import { createTypedFactory } from "@/factory";

const { createApp } = createTypedFactory();

export const addressRouter = createApp()
	.get("/country", (c) => {
		const data = Country.getAllCountries();
		const countries = data.map((country) => {
			return { name: country.name, isoCode: country.isoCode };
		});

		return c.json({ data: countries });
	})
	.get("/state/:country_code", (c) => {
		const isoCode = c.req.param("country_code");

		const data = State.getStatesOfCountry(isoCode);
		const states = data.map((state) => {
			return {
				name: state.name,
				isoCode: state.isoCode,
				countryCode: state.countryCode,
			};
		});

		return c.json({ data: states });
	})
	.get("/city/:state_code/:country_code", (c) => {
		const countryCode = c.req.param("country_code");
		const stateCode = c.req.param("state_code");

		const data = City.getCitiesOfState(countryCode, stateCode);
		const cities = data.map((city) => {
			return {
				name: city.name,
				stateCode: city.stateCode,
				countryCode: city.countryCode,
			};
		});

		return c.json({ data: cities });
	});
