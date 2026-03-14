import { createTypedFactory } from "@/factory";
import {
	getCitiesByState,
	getCountries,
	getStatesByCountry,
} from "./address.controller";

const { createApp } = createTypedFactory();

const addressRouter = createApp();

addressRouter
	.get("/country", ...getCountries)
	.get("/state/:country_code", ...getStatesByCountry)
	.get("/city/:state_code/:country_code", ...getCitiesByState);

export { addressRouter };
