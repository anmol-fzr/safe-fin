import { axiosInstance, type IResData } from "../axios";

const { get } = axiosInstance;

interface ICountry {
	name: string;
	isoCode: string;
}

interface IState {
	name: string;
	isoCode: string;
	countryCode: string;
}

interface ICity {
	name: string;
	stateCode: string;
	countryCode: string;
}

type IResCountries = IResData<ICountry[]>;
type IResStates = IResData<IState[]>;
type IResCities = IResData<ICity[]>;

export const ADDRESS = {
	COUNTRIES: () => get<unknown, IResCountries>(`/address/country`),
	STATES: (countryCode: string) =>
		get<unknown, IResStates>(`/address/state/${countryCode}`),
	CITIES: (stateCode: string, countryCode: string) =>
		get<unknown, IResCities>(`/address/city/${stateCode}/${countryCode}`),
} as const;
