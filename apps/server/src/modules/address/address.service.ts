import { City, Country, State } from "country-state-city";

export function getAllCountries() {
	return Country.getAllCountries();
}

export function getStateByCountryCode(code: string) {
	return State.getStatesOfCountry(code);
}

export function getCitiesOfState(countryCode: string, stateCode: string) {
	return City.getCitiesOfState(countryCode, stateCode);
}
